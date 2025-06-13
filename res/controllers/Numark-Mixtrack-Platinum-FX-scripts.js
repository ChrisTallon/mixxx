// eslint-disable-next-line no-var
var MixtrackPlatinumFX = {};

// FX
// FX toggles
MixtrackPlatinumFX.toggleFXControlEnable = true;
MixtrackPlatinumFX.toggleFXControlSuper = false;

MixtrackPlatinumFX.shiftBrowseIsZoom = false;

// setting this to false sets tap the file bpm, but without a way to reset its dangerous
MixtrackPlatinumFX.tapChangesTempo = true;

// pitch ranges
// add/remove/modify steps to your liking
// default step must be set in Mixxx settings
// setting is stored per deck in pitchRange.currentRangeIdx
MixtrackPlatinumFX.pitchRanges = [0.04, 0.08, 0.16, 0.5];

MixtrackPlatinumFX.HIGH_LIGHT = 0x7F;
MixtrackPlatinumFX.LOW_LIGHT = 0x01;

// whether the corresponding Mixxx option is enabled
// (Settings -> Preferences -> Waveforms -> Synchronize zoom level across all waveforms)
MixtrackPlatinumFX.waveformsSynced = true;

// jogwheel
MixtrackPlatinumFX.jogScratchSensitivity = 1024;
MixtrackPlatinumFX.jogScratchAlpha = 1; // do NOT set to 2 or higher
MixtrackPlatinumFX.jogScratchBeta = 1/32;
MixtrackPlatinumFX.jogPitchSensitivity = 10;
MixtrackPlatinumFX.jogSeekSensitivity = 10000;

// blink settings
MixtrackPlatinumFX.enableBlink = true;
MixtrackPlatinumFX.blinkDelay = 700;

// autoloop sizes, for available values see:
// https://manual.mixxx.org/2.3/en/chapters/appendix/mixxx_controls.html#control-[ChannelN]-beatloop_X_toggle
MixtrackPlatinumFX.autoLoopSizes = [
    "0.0625",
    "0.125",
    "0.25",
    "0.5",
    "1",
    "2",
    "4",
    "8"
];

// beatjump values, for available values see:
// https://manual.mixxx.org/2.3/en/chapters/appendix/mixxx_controls.html#control-[ChannelN]-beatjump_X_forward
// underscores (_) at the end are needed because numeric values (e.g. 8) have two underscores (e.g. beatjump_8_forward),
// but "beatjump_forward"/"beatjump_backward" have only one underscore
MixtrackPlatinumFX.beatJumpValues = [
    "0.0625_",
    "0.125_",
    "0.25_",
    "0.5_",
    "1_",
    "2_",
    "", // "beatjump_forward"/"beatjump_backward" - jump by the value selected in Mixxx GUI (4 by default)
    "8_"
];

// dim all lights when inactive instead of turning them off
components.Button.prototype.off = MixtrackPlatinumFX.LOW_LIGHT;

// Pad modes control codes
// Let's define the pad mode buttons from left to right, A-D
// These are the midi codes the Mixtrack sends
// Sadly, shift B & shift C don't exist
MixtrackPlatinumFX.PadModeControls = {
    A: 0x00,
    B: 0x0D,
    C: 0x07,
    D: 0x0B,
    SHIFT_A: 0x02,
    SHIFT_D: 0x0F,
    NONE: 0xFF
};

// ID definitions for all the possible available modes
// The numbers are arbitrary. Just make them all different. (enum)
MixtrackPlatinumFX.PadModes = {
    NONE: 0,
    HOTCUES1: 1,
    HOTCUES2: 2,
    AUTOLOOP1: 3,
    AUTOLOOP2: 4,
    CUELOOP: 5,
    FADERCUTS1: 6,
    FADERCUTS2: 7,
    FADERCUTS3: 8,
    SAMPLE1: 9,
    SAMPLE2: 10,
    KEYPLAY: 11,
    BEATJUMP: 12,
    BEATJUMP2: 13,
    STEMS: 14,
    CUSTOM1: 15
};

// Layer config. There are 6 pad mode layers:
// Layer 0: Simply press the pad mode button
// Layer 1: Hold shift and press the pad mode button
// Layer 2: Long press the pad mode button
// Layer 3: Double press the pad mode button
// Layer 4: Shift and long press the pad mode button
// Layer 5: Shift and double press the pad mode button

// A, B, C, D are the 4 pad mode buttons from left to right

/*
MixtrackPlatinumFX.PadModeLayerConfig = {
    A: [ MixtrackPlatinumFX.PadModes.HOTCUES1,       // Layer 0
         MixtrackPlatinumFX.PadModes.HOTCUES2,       // Layer 1
         MixtrackPlatinumFX.PadModes.BEATJUMP,       // Layer 2 ...
        MixtrackPlatinumFX.PadModes.BEATJUMP,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.NONE,],

    B: [ MixtrackPlatinumFX.PadModes.AUTOLOOP1,
         MixtrackPlatinumFX.PadModes.AUTOLOOP2,
         MixtrackPlatinumFX.PadModes.CUELOOP,
        MixtrackPlatinumFX.PadModes.CUELOOP,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.NONE,],

    C: [ MixtrackPlatinumFX.PadModes.FADERCUTS1,
         MixtrackPlatinumFX.PadModes.FADERCUTS2,
         MixtrackPlatinumFX.PadModes.FADERCUTS3,
        MixtrackPlatinumFX.PadModes.FADERCUTS3,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.NONE,],

    D: [ MixtrackPlatinumFX.PadModes.SAMPLE1,
         MixtrackPlatinumFX.PadModes.SAMPLE2,
         MixtrackPlatinumFX.PadModes.KEYPLAY,
        MixtrackPlatinumFX.PadModes.KEYPLAY,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.NONE,],
};
*/

MixtrackPlatinumFX.PadModeLayerConfig = {
    A: [MixtrackPlatinumFX.PadModes.HOTCUES1,       // Layer 0
        MixtrackPlatinumFX.PadModes.NONE,       // Layer 1
        MixtrackPlatinumFX.PadModes.HOTCUES2,       // Layer 2 ...
        MixtrackPlatinumFX.PadModes.BEATJUMP2,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.NONE,],

    B: [MixtrackPlatinumFX.PadModes.CUSTOM1,
        MixtrackPlatinumFX.PadModes.AUTOLOOP1,
        MixtrackPlatinumFX.PadModes.AUTOLOOP2,
        MixtrackPlatinumFX.PadModes.CUELOOP,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.NONE,],

    C: [MixtrackPlatinumFX.PadModes.FADERCUTS1,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.FADERCUTS2,
        MixtrackPlatinumFX.PadModes.FADERCUTS3,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.NONE,],

    D: [MixtrackPlatinumFX.PadModes.SAMPLE1,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.SAMPLE2,
        MixtrackPlatinumFX.PadModes.KEYPLAY,
        MixtrackPlatinumFX.PadModes.NONE,
        MixtrackPlatinumFX.PadModes.PREVIEW,],
};

/*
 * New CUSTOM1 mode:
 *
 * 1: 1/8 beat slip roll from AUTOLOOP2
 * 2: 1/4 beat slip roll from AUTOLOOP2
 * 3: 1/2 beat slip roll from AUTOLOOP2
 * 4: 1   beat slip roll from AUTOLOOP2
 * 5: slip reverse
 * 6: start of track
 * 7: rev?
 * 8: ffwd?
 *
 */


// enables 4 bottom pads "fader cuts" for 8
MixtrackPlatinumFX.faderCutSysex8 = [0xF0, 0x00, 0x20, 0x7F, 0x03, 0xF7];
// enables only 4 top pads "fader cuts"
MixtrackPlatinumFX.faderCutSysex4 = [0xF0, 0x00, 0x20, 0x7F, 0x13, 0xF7];

// Loop button: Set to true for loop button to always set a 16 beat quantized loop
MixtrackPlatinumFX.loopButton16Q = true;

// Change pitch bend buttons -/+ from standard behaviour to -/+ 0.01 BPM
MixtrackPlatinumFX.pitchBend001 = true;

// Disable BPM and rate display
MixtrackPlatinumFX.hideBPM = false;



// state variable, don't touch
MixtrackPlatinumFX.shifted = false;

MixtrackPlatinumFX.initComplete=false;

MixtrackPlatinumFX.bpms = [];
MixtrackPlatinumFX.trackBPM = function(value, group, _control) {
    // file_bpm always seems to be 0?
    // this doesn't work if we have to scan for bpm as it will be zero initially
    // so we hook into the bpm change as well, and if we have 0 then set it to the first value seen (in bpm output)
    MixtrackPlatinumFX.bpms[script.deckFromGroup(group) - 1] = engine.getValue(group, "bpm");
};

MixtrackPlatinumFX.mixxxFocussed = false;
MixtrackPlatinumFX.saveLibraryFocussedWidget = 3;

MixtrackPlatinumFX.BlinkTimer=0;
MixtrackPlatinumFX.BlinkState=true;
MixtrackPlatinumFX.BlinkStateSlow=true;
MixtrackPlatinumFX.CallBacks=[];
MixtrackPlatinumFX.CallSpeed=[];
MixtrackPlatinumFX.BlinkStart = function(callback, slow) {
    for (const i in MixtrackPlatinumFX.CallBacks) {
        if (!MixtrackPlatinumFX.CallBacks[i]) {
            // empty slot
            MixtrackPlatinumFX.CallBacks[i]=callback;
            MixtrackPlatinumFX.CallSpeed[i]=slow;
            return Number(i)+1;
        }
    }
    const idx = MixtrackPlatinumFX.CallBacks.push(callback);
    MixtrackPlatinumFX.CallSpeed[idx-1]=slow;
    return idx;
};
MixtrackPlatinumFX.BlinkStop = function(index) {
    MixtrackPlatinumFX.CallBacks[index-1]=null;
};
MixtrackPlatinumFX.BlinkFunc = function() {
    // toggle the global blink variables
    MixtrackPlatinumFX.BlinkState = !MixtrackPlatinumFX.BlinkState;
    if (MixtrackPlatinumFX.BlinkState) {
        MixtrackPlatinumFX.BlinkStateSlow = !MixtrackPlatinumFX.BlinkStateSlow;
    }

    // if we should be blinking the fx, then call its function
    if (MixtrackPlatinumFX.FxBlinkState) {
        MixtrackPlatinumFX.FxBlinkUpdateLEDs();
    }
    // fire any callbacks
    for (const i in MixtrackPlatinumFX.CallBacks) {
        if (MixtrackPlatinumFX.CallBacks[i]) {
            if (MixtrackPlatinumFX.CallSpeed[i]) {
                if (MixtrackPlatinumFX.BlinkState) {
                    MixtrackPlatinumFX.CallBacks[i](MixtrackPlatinumFX.BlinkStateSlow);
                }
            } else {
                MixtrackPlatinumFX.CallBacks[i](MixtrackPlatinumFX.BlinkState);
            }
        }
    }
};

MixtrackPlatinumFX.init = function(id, debug) {
    MixtrackPlatinumFX.id = id;
    MixtrackPlatinumFX.debug = debug;
    // print("init MixtrackPlatinumFX " + id + " debug: " + debug);

    // disable demo lightshow
    const exitDemoSysex = [0xF0, 0x7E, 0x00, 0x06, 0x01, 0xF7];
    midi.sendSysexMsg(exitDemoSysex, exitDemoSysex.length);

    // status, extra 04 is just more device id, not sure what the 05 is
    //F0 00 20 04 7F 03 01 05 F7

    // wake (not sure what the extra 07 is for?
    //F0 7E 00 07 06 01 F7

    // I think these are the dial updates
    //F0 00 20 04 7F 02 02 04 08 00 00 04 00 00 00 05 F7
    //F0 00 20 04 7F 04 01 04 00 00 00 04 00 00 00 05 F7
    //F0 00 20 04 7F 02 04 04 08 00 00 04 00 00 00 07 00 00 F7
    //F0 00 20 04 7F 03 02 04 08 00 00 04 00 00 00 05 F7
    //F0 00 20 04 7F 03 04 04 08 00 00 04 00 00 00 07 00 00 F7
    //F0 00 20 04 7F 01 04 04 08 00 00 04 00 00 00 07 00 00 F7
    //F0 00 20 04 7F 04 04 04 08 00 00 04 00 00 00 07 00 00 F7

    // default to just the top 4
    midi.sendSysexMsg(MixtrackPlatinumFX.faderCutSysex4, MixtrackPlatinumFX.faderCutSysex4.length);

    // initialize component containers
    MixtrackPlatinumFX.deck = new components.ComponentContainer();
    MixtrackPlatinumFX.effect = new components.ComponentContainer();
    let i;
    for (i = 0; i < 4; i++) {
        const group=`[Channel${  i+1  }]`;
        MixtrackPlatinumFX.deck[i] = new MixtrackPlatinumFX.Deck(i + 1);
        MixtrackPlatinumFX.updateRateRange(i, group, MixtrackPlatinumFX.pitchRanges[0]);
        // refresh keylock state (the output mapping in the xml doesn't seem to do it
        midi.sendShortMsg(0x80 | i, 0x0D, engine.getValue(group, "keylock")?0x7F:0x00);
        midi.sendShortMsg(0x90 | i, 0x0D, engine.getValue(group, "keylock")?0x7F:0x00);
        // Hook into this and save the bpm_file when loaded so we can reset it later
        engine.makeConnection(group, "track_loaded", MixtrackPlatinumFX.trackBPM).trigger();
    }
    for (i = 0; i < 2; i++) {
        MixtrackPlatinumFX.effect[i] = new MixtrackPlatinumFX.EffectUnit((i % 2)+1);
    }
    // turn effect for master and headphones off to avoid confusion
    engine.setValue("[EffectRack1_EffectUnit1]", "group_[Headphone]_enable", 0);
    engine.setValue("[EffectRack1_EffectUnit2]", "group_[Headphone]_enable", 0);
    engine.setValue("[EffectRack1_EffectUnit1]", "group_[Master]_enable", 0);
    engine.setValue("[EffectRack1_EffectUnit2]", "group_[Master]_enable", 0);

    MixtrackPlatinumFX.browse = new MixtrackPlatinumFX.Browse();
    MixtrackPlatinumFX.gains = new MixtrackPlatinumFX.Gains();

    const statusSysex = [0xF0, 0x00, 0x20, 0x7F, 0x03, 0x01, 0xF7];
    midi.sendSysexMsg(statusSysex, statusSysex.length);

    engine.makeConnection("[Channel1]", "VuMeter", MixtrackPlatinumFX.vuCallback);
    engine.makeConnection("[Channel2]", "VuMeter", MixtrackPlatinumFX.vuCallback);
    engine.makeConnection("[Channel3]", "VuMeter", MixtrackPlatinumFX.vuCallback);
    engine.makeConnection("[Channel4]", "VuMeter", MixtrackPlatinumFX.vuCallback);

    engine.makeConnection("[Channel1]", "rate", MixtrackPlatinumFX.rateCallback).trigger();
    engine.makeConnection("[Channel2]", "rate", MixtrackPlatinumFX.rateCallback).trigger();
    engine.makeConnection("[Channel3]", "rate", MixtrackPlatinumFX.rateCallback).trigger();
    engine.makeConnection("[Channel4]", "rate", MixtrackPlatinumFX.rateCallback).trigger();

    // trigger is needed to initialize lights to 0x01
    MixtrackPlatinumFX.deck.forEachComponent(function(component) {
        component.trigger();
    });
    MixtrackPlatinumFX.effect.forEachComponent(function(component) {
        component.trigger();
    });

    // set FX buttons init light)
    midi.sendShortMsg(0x98, 0x00, MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x98, 0x01, MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x98, 0x02, MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x99, 0x03, MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x99, 0x04, MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x99, 0x05, MixtrackPlatinumFX.LOW_LIGHT);

    // since we default to active on deck 1 and 2 make sure the controller does too
    midi.sendShortMsg(0x90, 0x08, 0x7F);
    midi.sendShortMsg(0x91, 0x08, 0x7F);

    // setup elapsed/remaining tracking
    engine.makeConnection("[Controls]", "ShowDurationRemaining", MixtrackPlatinumFX.timeElapsedCallback);
    MixtrackPlatinumFX.initComplete=true;
    MixtrackPlatinumFX.updateArrows(true);

    engine.makeConnection("[Library]", "focused_widget", MixtrackPlatinumFX.libraryFocussedWidgetCallback);

    // The above doesn't work with my Mixxx.
    // Force remaining time display here
    midi.sendShortMsg(0x90, 0x46, 0x7F);
    midi.sendShortMsg(0x91, 0x46, 0x7F);
    midi.sendShortMsg(0x92, 0x46, 0x7F);
    midi.sendShortMsg(0x93, 0x46, 0x7F);

    MixtrackPlatinumFX.BlinkTimer = engine.beginTimer(MixtrackPlatinumFX.blinkDelay/2, MixtrackPlatinumFX.BlinkFunc);
};

MixtrackPlatinumFX.shutdown = function() {
    const shutdownSysex = [0xF0, 0x00, 0x20, 0x7F, 0x02, 0xF7];
    let i;

    if (MixtrackPlatinumFX.BlinkTimer!==0) {
        engine.stopTimer(MixtrackPlatinumFX.BlinkTimer);
        MixtrackPlatinumFX.BlinkTimer=0;
    }

    for (i=0; i<4; i++) {
        // update spinner and position indicator
        midi.sendShortMsg(0xB0 | i, 0x3F, 0);
        midi.sendShortMsg(0xB0 | i, 0x06, 0);
        // keylock indicator
        midi.sendShortMsg(0x80 | i, 0x0D, 0x00);
        // turn off bpm arrows
        midi.sendShortMsg(0x80 | i, 0x0A, 0x00); // down arrow off
        midi.sendShortMsg(0x80 | i, 0x09, 0x00); // up arrow off

        MixtrackPlatinumFX.sendScreenRateMidi(i+1, 0);
        midi.sendShortMsg(0x90+i, 0x0e, 0);
        MixtrackPlatinumFX.sendScreenBpmMidi(i+1, 0);
        MixtrackPlatinumFX.sendScreenTimeMidi(i+1, 0);
        MixtrackPlatinumFX.sendScreenDurationMidi(i+1, 2);
    }

    // switch to decks 1 and 2
    midi.sendShortMsg(0x90, 0x08, 0x7F);
    midi.sendShortMsg(0x91, 0x08, 0x7F);

    midi.sendSysexMsg(shutdownSysex, shutdownSysex.length);
};

MixtrackPlatinumFX.shift = function() {
    MixtrackPlatinumFX.shifted = true;
    MixtrackPlatinumFX.deck.shift();
    MixtrackPlatinumFX.browse.shift();
    MixtrackPlatinumFX.effect.shift();
    MixtrackPlatinumFX.gains.cueGain.shift();
};

MixtrackPlatinumFX.unshift = function() {
    MixtrackPlatinumFX.shifted = false;
    MixtrackPlatinumFX.deck.unshift();
    MixtrackPlatinumFX.browse.unshift();
    MixtrackPlatinumFX.effect.unshift();
    MixtrackPlatinumFX.gains.cueGain.unshift();
};

MixtrackPlatinumFX.allEffectOff = function() {
    MixtrackPlatinumFX.effect[0].effects=[false, false, false];
    MixtrackPlatinumFX.effect[1].effects=[false, false, false];
    MixtrackPlatinumFX.FxBlinkUpdateLEDs();
    MixtrackPlatinumFX.effect[0].updateEffects();
    MixtrackPlatinumFX.effect[1].updateEffects();
};

MixtrackPlatinumFX.FxBlinkUpdateLEDs = function() {
    let newStates1=[false, false, false];
    let newStates2=[false, false, false];
    if (!MixtrackPlatinumFX.FxBlinkState || MixtrackPlatinumFX.BlinkState) {
        newStates1=MixtrackPlatinumFX.effect[0].effects;
        newStates2=MixtrackPlatinumFX.effect[1].effects;
    }
    midi.sendShortMsg(0x98, 0x00, newStates1[0] ? MixtrackPlatinumFX.HIGH_LIGHT:MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x98, 0x01, newStates1[1] ? MixtrackPlatinumFX.HIGH_LIGHT:MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x98, 0x02, newStates1[2] ? MixtrackPlatinumFX.HIGH_LIGHT:MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x99, 0x03, newStates2[0] ? MixtrackPlatinumFX.HIGH_LIGHT:MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x99, 0x04, newStates2[1] ? MixtrackPlatinumFX.HIGH_LIGHT:MixtrackPlatinumFX.LOW_LIGHT);
    midi.sendShortMsg(0x99, 0x05, newStates2[2] ? MixtrackPlatinumFX.HIGH_LIGHT:MixtrackPlatinumFX.LOW_LIGHT);
};

MixtrackPlatinumFX.FxBlinkTimer=0;
MixtrackPlatinumFX.FxBlinkState=true;
MixtrackPlatinumFX.FxBlink = function() {
    const start = MixtrackPlatinumFX.effect[0].isSwitchHolded || MixtrackPlatinumFX.effect[1].isSwitchHolded;

    if (start) {
        MixtrackPlatinumFX.FxBlinkState = true;
        MixtrackPlatinumFX.FxBlinkUpdateLEDs();
    } else {
        // stop
        MixtrackPlatinumFX.FxBlinkState = false;
        MixtrackPlatinumFX.FxBlinkUpdateLEDs();
    }
};

// TODO in 2.3 it is not possible to "properly" map the FX selection buttons.
// this should be done with load_preset and QuickEffects instead (when effect
// chain preset saving/loading is available in Mixxx)
MixtrackPlatinumFX.EffectUnit = function(deckNumber) {
    this.effects = [false, false, false];
    this.isSwitchHolded = false;

    this.updateEffects = function() {
        if (MixtrackPlatinumFX.toggleFXControlEnable) {
            for (let i = 1; i <= this.effects.length; i++) {
                engine.setValue(`[EffectRack1_EffectUnit${  deckNumber  }_Effect${i}]`, "enabled", this.effects[i-1]);
            }
        }
    };

    // switch values are:
    // 0 - switch in the middle
    // 1 - switch up
    // 2 - switch down
    this.enableSwitch = function(channel, control, value, status, group) {
        this.isSwitchHolded = value !== 0;

        if (MixtrackPlatinumFX.toggleFXControlSuper) {
            engine.setValue(group, "super1", Math.min(value, 1.0));
        }

        let fxDeck=deckNumber;
        if (!MixtrackPlatinumFX.deck[deckNumber-1].active) {
            fxDeck+=2;
        }
        engine.setValue("[EffectRack1_EffectUnit1]", `group_[Channel${  fxDeck  }]_enable`, (value !== 0));
        engine.setValue("[EffectRack1_EffectUnit2]", `group_[Channel${  fxDeck  }]_enable`, (value !== 0));

        this.updateEffects();

        MixtrackPlatinumFX.FxBlink();
    };

    this.dryWetKnob = new components.Pot({
        group: `[EffectRack1_EffectUnit${  deckNumber  }]`,
        inKey: "mix"
    });

    this.effect1 = function(channel, control, value, status, _group) {
        if (value === 0x7F) {
            if (!MixtrackPlatinumFX.shifted) {
                MixtrackPlatinumFX.allEffectOff();
            }
            this.effects[0] = !this.effects[0];
            midi.sendShortMsg(status, control, this.effects[0] ? MixtrackPlatinumFX.HIGH_LIGHT : MixtrackPlatinumFX.LOW_LIGHT);
        }


        this.updateEffects();
    };

    this.effect2 = function(channel, control, value, status, _group) {
        if (value === 0x7F) {
            if (!MixtrackPlatinumFX.shifted) {
                MixtrackPlatinumFX.allEffectOff();
            }
            this.effects[1] = !this.effects[1];
            midi.sendShortMsg(status, control, this.effects[1] ? MixtrackPlatinumFX.HIGH_LIGHT : MixtrackPlatinumFX.LOW_LIGHT);
        }

        this.updateEffects();
    };

    this.effect3 = function(channel, control, value, status, _group) {
        if (value === 0x7F) {
            if (!MixtrackPlatinumFX.shifted) {
                MixtrackPlatinumFX.allEffectOff();
            }
            this.effects[2] = !this.effects[2];
            midi.sendShortMsg(status, control, this.effects[2] ? MixtrackPlatinumFX.HIGH_LIGHT : MixtrackPlatinumFX.LOW_LIGHT);
        }

        this.updateEffects();
    };

    // copy paste since I'm not sure if we want to handle it like this or not
    this.effectParam = new components.Encoder({
        group: `[EffectRack1_EffectUnit${  deckNumber  }_Effect1]`,
        shift: function() {
            this.inKey = "meta";
        },
        unshift: function() {
            this.inKey = "parameter1";
        },
        input: function(channel, control, value) {
            this.inSetParameter(this.inGetParameter() + this.inValueScale(value));
        },
        inValueScale: function(value) {
            return (value < 0x40) ? 0.05 : -0.05;
        }
    });
    this.effectParam2 = new components.Encoder({
        group: `[EffectRack1_EffectUnit${  deckNumber  }_Effect2]`,
        shift: function() {
            this.inKey = "meta";
        },
        unshift: function() {
            this.inKey = "parameter1";
        },
        input: function(channel, control, value) {
            this.inSetParameter(this.inGetParameter() + this.inValueScale(value));
        },
        inValueScale: function(value) {
            return (value < 0x40) ? 0.05 : -0.05;
        }
    });
    this.effectParam3 = new components.Encoder({
        group: `[EffectRack1_EffectUnit${  deckNumber  }_Effect3]`,
        shift: function() {
            this.inKey = "meta";
        },
        unshift: function() {
            this.inKey = "parameter1";
        },
        input: function(channel, control, value) {
            this.inSetParameter(this.inGetParameter() + this.inValueScale(value));
        },
        inValueScale: function(value) {
            return (value < 0x40) ? 0.05 : -0.05;
        }
    });
};


MixtrackPlatinumFX.EffectUnit.prototype = new components.ComponentContainer();

MixtrackPlatinumFX.activeForTap = function(value) {
    // fuzzy logic
    // to tap we probably want a playing deck
    // and we probably don't want it "live"
    // we will need it "active"
    // so best is a playing deck with pfl = 5
    // next best a stopped deck with pfl = 4
    // then a playing deck = 3
    // then a stopped deck without pfl (which by this point is any loaded) = 2
    // and as a fallback a deck that isn't active
    // if there are multiple then the lowest number wins (1,2,3,4)
    // if no decks with loaded tracks then -1 so caller should check for that
    let i=0;
    let winner=-1;
    let winnerScore=0;
    for (i=0; i<4; i++) {
        if (engine.getValue(`[Channel${  i+1  }]`, "track_loaded")) {
            if (MixtrackPlatinumFX.deck[i].active) {
                var localscore=0;
                if (engine.getValue(`[Channel${  i+1  }]`, "pfl")) {
                    if (engine.getValue(`[Channel${  i+1  }]`, "play")) {
                        localscore=5;
                    } else {
                        localscore=4;
                    }
                } else {
                    if (engine.getValue(`[Channel${  i+1  }]`, "play")) {
                        localscore=3;
                    } else {
                        localscore=2;
                    }
                }
            } else {
                localscore=1;
            }
            if (localscore>winnerScore) {
                winnerScore=localscore;
                winner=i;
            }
        }
    }

    if (winner>=0) {
        if (value>0) {
            MixtrackPlatinumFX.updateArrows(false, true, winner);
        } else {
            MixtrackPlatinumFX.updateArrows(true);
        }
    }

    return winner;
};

MixtrackPlatinumFX.Deck = function(number) {
    components.Deck.call(this, number);

    const channel = number - 1;
    const deck = this;
    this.scratchModeEnabled = true;
    this.active = (number === 1 || number === 2);

    this.setActive = function(active) {
        this.active = active;

        if (!active) {
            // trigger soft takeover on the pitch control
            this.pitch.disconnect();
        }
    };

    this.bpm = new components.Component({
        outKey: "bpm",
        output: function(value, group, _control) {
            if (MixtrackPlatinumFX.bpms[script.deckFromGroup(group) - 1]===0) {
                MixtrackPlatinumFX.bpms[script.deckFromGroup(group) - 1] = engine.getValue(group, "bpm");
            }
            MixtrackPlatinumFX.sendScreenBpmMidi(number, Math.round(value * 100));
        },
    });

    this.duration = new components.Component({
        outKey: "duration",
        output: function(duration, _group, _control) {
            // update duration
            MixtrackPlatinumFX.sendScreenDurationMidi(number, duration * 1000);

            // when the duration changes, we need to update the play position
            deck.position.trigger();
        },
    });

    this.position = new components.Component({
        outKey: "playposition",
        output: function(playposition, _group, _control) {
            // the controller appears to expect a value in the range of 0-52
            // representing the position of the track. Here we send a message to the
            // controller to update the position display with our current position.
            let pos = Math.round(playposition * 52);
            if (pos < 0) {
                pos = 0;
            }
            midi.sendShortMsg(0xB0 | channel, 0x3F, pos);

            // get the current duration
            const duration = deck.duration.outGetValue();

            // update the time display
            const time = MixtrackPlatinumFX.timeMs(number, playposition, duration);
            MixtrackPlatinumFX.sendScreenTimeMidi(number, time);

            // update the spinner (range 64-115, 52 values)
            //
            // the visual spinner in the mixxx interface takes 1.8 seconds to loop
            // (60 seconds/min divided by 33 1/3 revolutions per min)
            const period = 60 / (33+1/3);
            const midiResolution = 52; // the controller expects a value range of 64-115
            const timeElapsed = duration * playposition;
            let spinner = Math.round(timeElapsed % period * (midiResolution / period));
            if (spinner < 0) {
                spinner += 115;
            } else {
                spinner += 64;
            }

            midi.sendShortMsg(0xB0 | channel, 0x06, spinner);
        },
    });

    this.playButton = new components.PlayButton({
        midi: [0x90 + channel, 0x00],
        shiftControl: true,
        sendShifted: true,
        shiftOffset: 0x04,
    });

    this.playButtonbeatgrid = function(channel, control, value, status, group) {
        engine.setValue(group, "beats_translate_curpos", value?1:0);
    };

    // // MixtrackPlatinumFX.elapsedToggle
    // this.playButtonbeatgrid = function(channel, control, value, _status, _group) {
    //     if (value !== 0x7F) { return; }
    //
    //     const currentsetting = engine.getValue("[Controls]", "ShowDurationRemaining");
    //     if (currentsetting === 0) {
    //         // currently showing elapsed, set to remaining
    //         engine.setValue("[Controls]", "ShowDurationRemaining", 1);
    //     } else if (currentsetting === 1) {
    //         // currently showing remaining, set to elapsed
    //         engine.setValue("[Controls]", "ShowDurationRemaining", 0);
    //     } else {
    //         // currently showing both (that means we are showing remaining, set to elapsed
    //         engine.setValue("[Controls]", "ShowDurationRemaining", 0);
    //     }
    //
    // };


    this.cueButton = new components.CueButton({
        midi: [0x90 + channel, 0x01],
        shiftControl: true,
        sendShifted: true,
        shiftOffset: 0x04
    });

    this.syncButton = new components.SyncButton({
        midi: [0x90 + channel, 0x02],
        shiftControl: true,
        sendShifted: true,
        shiftOffset: 0x01
    });

    // we get two midi callbacks for tap, but double taps will be confusing so we just ignore the second set
    if (number===1) {
        if (MixtrackPlatinumFX.tapChangesTempo) {
            this.tap = new components.Button({
                unshift: function() {
                    this.disconnect();
                    this.input = function(channel, control, value, _status, _group) {
                        const tapch=MixtrackPlatinumFX.activeForTap(value)+1;
                        if (tapch) {
                            if (value>0) {
                                const prelen = bpm.tap.length;
                                const predelta = bpm.previousTapDelta;
                                bpm.tapButton(tapch);
                                // if the array reset, or changed then the tap was "accepted"
                                if ((bpm.tap.length===0) || (bpm.tap.length!==prelen) || predelta!==bpm.previousTapDelta) {
                                    this.send(this.outValueScale(value));
                                } else {
                                    this.send(0);
                                }
                            } else {
                                this.send(this.outValueScale(value));
                            }
                        }
                    };
                },
                shift: function() {
                    // reset rate to 0 (i.e. no tempo change)
                    this.disconnect();
                    this.input = function(channel, control, value, _status, _group) {
                        const tapch=MixtrackPlatinumFX.activeForTap(value)+1;
                        if (value>0 && tapch) {
                            engine.setValue(`[Channel${  tapch  }]`, "rate", 0);
                        }
                    };
                },
                midi: [0x88, 0x09]
            });
            this.tap.output(0);
        } else {
            this.tap = new components.Button({
                shift: function() {
                    this.disconnect();
                    this.input = function(channel, control, value, _status, _group) {
                        const tapch=MixtrackPlatinumFX.activeForTap(value)+1;
                        if (tapch) {
                            // This doesn't work, it doesn't set the bpm, it sets the rate to achieve this bpm
                            if (value>0 && MixtrackPlatinumFX.bpms[tapch-1]) {
                                engine.setValue(`[Channel${  tapch  }]`, "bpm", MixtrackPlatinumFX.bpms[tapch-1]);
                            }
                            this.send(this.outValueScale(value));
                        }
                    };
                },
                unshift: function() {
                    /*
					this.disconnect();
					this.input = components.Button.prototype.input;
					this.inKey = "bpm_tap";
					this.outKey = "bpm_tap";
					this.connect();
					this.trigger();
					*/
                    this.input = function(channel, control, value, _status, _group) {
                        const tapch=MixtrackPlatinumFX.activeForTap(value)+1;
                        if (tapch) {
                            engine.setValue(`[Channel${  tapch  }]`, "bpm_tap", value);
                            this.send(this.outValueScale(value));
                        }
                    };
                },
                //key: "bpm_tap",
                midi: [0x88, 0x09]
            });
            this.tap.output(0);
        }
    } else {
        // ignore callbacks other than the first
        this.tap = new components.Button({
            // null, ignore the second mapping
            input: function(_channel, _control, _value, _status, _group) { },
        });
    }

    this.pflButton = new components.Button({
        shift: function() {
            this.disconnect();
            this.inKey = "slip_enabled";
            this.outKey = "slip_enabled";
            this.connect();
            this.trigger();
        },
        unshift: function() {
            this.disconnect();
            this.inKey = "pfl";
            this.outKey = "pfl";
            this.connect();
            this.trigger();
        },
        type: components.Button.prototype.types.toggle,
        midi: [0x90 + channel, 0x1B],
    });

    this.loadButton = new components.Button({
        shift: function() {
            this.inKey = "eject";
        },
        unshift: function() {
            this.inKey = "LoadSelectedTrack";
        },
    });

    this.volume = new components.Pot({
        inKey: "volume"
    });

    this.treble = new components.Pot({
        group: `[EqualizerRack1_${  this.currentDeck  }_Effect1]`,
        inKey: "parameter3"
    });

    this.mid = new components.Pot({
        group: `[EqualizerRack1_${  this.currentDeck  }_Effect1]`,
        inKey: "parameter2"
    });

    this.bass = new components.Pot({
        group: `[EqualizerRack1_${  this.currentDeck  }_Effect1]`,
        inKey: "parameter1"
    });

    this.filter = new components.Pot({
        group: `[QuickEffectRack1_${  this.currentDeck  }]`,
        inKey: "super1"
    });

    this.gain = new components.Pot({
        inKey: "pregain"
    });

    this.pitch = new components.Pot({
        inKey: "rate",
        invert: true
    });

    this.padSection = new MixtrackPlatinumFX.PadSection(number);

    this.loop = new components.Button({
        outKey: "loop_enabled",
        midi: [0x94 + channel, 0x40],
        input: function(channel, control, value, status, group) {
            if (!this.isPress(channel, control, value)) {
                return;
            }

            if (!MixtrackPlatinumFX.shifted) {
                if (engine.getValue(group, "loop_enabled") === 0) {

                    if (MixtrackPlatinumFX.loopButton16Q) {
                        const quantizeBefore = engine.getParameter(group, "quantize");
                        engine.setParameter(group, "quantize", 1);
                        engine.setParameter(group, "beatloop_16_activate", 1);
                        if (!quantizeBefore) { engine.setParameter(group, "quantize", 0); }
                    } else {
                        script.triggerControl(group, "beatloop_activate");
                    }
                } else {
                    script.triggerControl(group, "beatlooproll_activate");
                }
            } else {
                if (engine.getValue(group, "loop_enabled") === 0) {
                    script.triggerControl(group, "reloop_toggle");
                } else {
                    script.triggerControl(group, "reloop_andstop");
                }
            }
        },
        shiftControl: true,
        sendShifted: true,
        shiftOffset: 0x01
    });

    this.loopHalf = new components.Button({
        midi: [0x94 + channel, 0x34],
        shiftControl: true,
        sendShifted: true,
        shiftOffset: 0x02,
        shift: function() {
            this.disconnect();
            this.inKey = "loop_in";
            this.outKey = "loop_in";
            this.connect();
            this.trigger();
        },
        unshift: function() {
            this.disconnect();
            this.inKey = "loop_halve";
            this.outKey = "loop_halve";
            this.connect();
            this.trigger();
        }
    });

    this.loopDouble = new components.Button({
        midi: [0x94 + channel, 0x35],
        shiftControl: true,
        sendShifted: true,
        shiftOffset: 0x02,
        shift: function() {
            this.disconnect();
            this.inKey = "loop_out";
            this.outKey = "loop_out";
            this.connect();
            this.trigger();
        },
        unshift: function() {
            this.disconnect();
            this.inKey = "loop_double";
            this.outKey = "loop_double";
            this.connect();
            this.trigger();
        }
    });

    this.scratchToggle = new components.Button({
        //         disconnects/connects are needed for the following scenario:
        //         1. scratch mode is enabled (light on)
        //         2. shift down
        //         3. scratch button down
        //         4. shift up
        //         5. scratch button up
        //         scratch mode light is now off, should be on
        key: "reverseroll",
        midi: [0x90 + channel, 0x07],
        unshift: function() {
            this.disconnect(); // disconnect reverseroll light
            this.input = function(channel, control, value) {
                if (!this.isPress(channel, control, value)) {
                    return;
                }
                deck.scratchModeEnabled = !deck.scratchModeEnabled;


                // change the scratch mode status light
                this.send(deck.scratchModeEnabled ? this.on : this.off);


            };
            // set current scratch mode status light
            this.send(deck.scratchModeEnabled ? this.on : this.off);
        },
        sendShifted: false
    });

    this.pitchBendUp = new components.Button({
        shiftControl: true,
        shiftOffset: 0x20,
        shift: function() {
            this.type = components.Button.prototype.types.toggle;
            this.inKey = "keylock";
            this.input = components.Button.prototype.input;
        },
        unshift: function() {
            if (MixtrackPlatinumFX.pitchBend001) {
                this.input = function(channel, control, value) {
                    if (!this.isPress(channel, control, value)) {
                        return;
                    }
                    const group = `[Channel${ channel + 1 }]`;
                    engine.setValue(group, "bpm", engine.getValue(group, "bpm") + 0.01);
                };
            } else { // Standard pitch bend behaviour
                this.inKey = "rate_temp_up";
                this.input = components.Button.prototype.input;
                this.type = components.Button.prototype.types.push;
            }
        }

    });

    this.pitchBendDown = new components.Button({
        currentRangeIdx: 0,
        shift: function() {
            this.input = function(channel, control, value) {
                if (!this.isPress(channel, control, value)) {
                    return;
                }
                this.currentRangeIdx = (this.currentRangeIdx + 1) % MixtrackPlatinumFX.pitchRanges.length;
                MixtrackPlatinumFX.updateRateRange(channel, this.group, MixtrackPlatinumFX.pitchRanges[this.currentRangeIdx]);
            };
        },
        unshift: function() {
            if (MixtrackPlatinumFX.pitchBend001) {
                this.input = function(channel, control, value) {
                    if (!this.isPress(channel, control, value)) {
                        return;
                    }
                    const group = `[Channel${ channel + 1 }]`;
                    engine.setValue(group, "bpm", engine.getValue(group, "bpm") - 0.01);
                };
            } else { // Standard pitch bend behaviour
                this.inKey = "rate_temp_down";
                this.input = components.Button.prototype.input;
                this.type = components.Button.prototype.types.push;
            }
        }
    });

    this.setBeatgrid = new components.Button({
        key: "beats_translate_curpos",
        midi: [0x98 + channel, 0x01 + (channel * 3)]
    });

    this.reconnectComponents(function(component) {
        if (component.group === undefined) {
            component.group = this.currentDeck;
        }
    });
};

MixtrackPlatinumFX.Deck.prototype = new components.Deck();


MixtrackPlatinumFX.PadSection = function(deckNumber) {
    components.ComponentContainer.call(this);

    this.blinkTimer = 0;

    this.longPressTimer = 0;
    this.longPressMode = 0;
    this.longPressHeld = false;
    this.currentMode = MixtrackPlatinumFX.PadModes.NONE;
    this.currentModeButton = MixtrackPlatinumFX.PadModeControls.NONE;
    this.doubleFirstControl = MixtrackPlatinumFX.PadModeControls.NONE;
    this.currentLayer = 0;

    // initialize leds
    const ledOff = components.Button.prototype.off;
    const ledOn = components.Button.prototype.on;
    midi.sendShortMsg(0x93 + deckNumber, 0x00, ledOn); // hotcue
    midi.sendShortMsg(0x93 + deckNumber, 0x0D, ledOff); // auto loop
    midi.sendShortMsg(0x93 + deckNumber, 0x07, ledOff); // fader cuts
    midi.sendShortMsg(0x93 + deckNumber, 0x0B, ledOff); // sample

    // shifted leds
    midi.sendShortMsg(0x93 + deckNumber, 0x02, ledOff); // hotcue
    midi.sendShortMsg(0x93 + deckNumber, 0x0F, ledOff); // sample

    // Instantiate objects for all possible pad modes
    this.modes = {};
    this.modes[MixtrackPlatinumFX.PadModes.HOTCUES1] = new MixtrackPlatinumFX.ModeHotcue(deckNumber, MixtrackPlatinumFX.PadModes.HOTCUES1);
    this.modes[MixtrackPlatinumFX.PadModes.HOTCUES2] = new MixtrackPlatinumFX.ModeHotcue(deckNumber, MixtrackPlatinumFX.PadModes.HOTCUES2);
    this.modes[MixtrackPlatinumFX.PadModes.AUTOLOOP1] = new MixtrackPlatinumFX.ModeAutoLoop(deckNumber, MixtrackPlatinumFX.PadModes.AUTOLOOP1);
    this.modes[MixtrackPlatinumFX.PadModes.AUTOLOOP2] = new MixtrackPlatinumFX.ModeAutoLoop(deckNumber, MixtrackPlatinumFX.PadModes.AUTOLOOP2);
    this.modes[MixtrackPlatinumFX.PadModes.CUELOOP] = new MixtrackPlatinumFX.ModeCueLoop(deckNumber);
    this.modes[MixtrackPlatinumFX.PadModes.FADERCUTS1] = new MixtrackPlatinumFX.ModeFaderCuts(deckNumber, MixtrackPlatinumFX.PadModes.FADERCUTS1);
    this.modes[MixtrackPlatinumFX.PadModes.FADERCUTS2] = new MixtrackPlatinumFX.ModeFaderCuts(deckNumber, MixtrackPlatinumFX.PadModes.FADERCUTS2);
    this.modes[MixtrackPlatinumFX.PadModes.FADERCUTS3] = new MixtrackPlatinumFX.ModeFaderCuts(deckNumber, MixtrackPlatinumFX.PadModes.FADERCUTS3);
    this.modes[MixtrackPlatinumFX.PadModes.SAMPLE1] = new MixtrackPlatinumFX.ModeSample(deckNumber, MixtrackPlatinumFX.PadModes.SAMPLE1);
    this.modes[MixtrackPlatinumFX.PadModes.SAMPLE2] = new MixtrackPlatinumFX.ModeSample(deckNumber, MixtrackPlatinumFX.PadModes.SAMPLE2);
    this.modes[MixtrackPlatinumFX.PadModes.BEATJUMP] = new MixtrackPlatinumFX.ModeBeatjump(deckNumber);
    this.modes[MixtrackPlatinumFX.PadModes.BEATJUMP2] = new MixtrackPlatinumFX.ModeBeatjump2(deckNumber);
    this.modes[MixtrackPlatinumFX.PadModes.KEYPLAY] = new MixtrackPlatinumFX.ModeKeyPlay(deckNumber);
    this.modes[MixtrackPlatinumFX.PadModes.STEMS] = new MixtrackPlatinumFX.ModeStems(deckNumber);
    this.modes[MixtrackPlatinumFX.PadModes.CUSTOM1] = new MixtrackPlatinumFX.ModeCustom1(deckNumber);
    this.modes[MixtrackPlatinumFX.PadModes.PREVIEW] = new MixtrackPlatinumFX.ModePreview(deckNumber);


    this.modeButtonPress = function(channel, control, value) {
        let press = false;
        let release = false;
        let doublePress = false;
        let timerExists = (this.longPressTimer !== 0);
        let shift = MixtrackPlatinumFX.shifted;

        // Standardise SHIFT_A & SHIFT_D (we already know shift)
        if      (control === MixtrackPlatinumFX.PadModeControls.SHIFT_A) control = MixtrackPlatinumFX.PadModeControls.A;
        else if (control === MixtrackPlatinumFX.PadModeControls.SHIFT_D) control = MixtrackPlatinumFX.PadModeControls.D;

        if (value === 0x7F) press = true;
        else release = true;

        if (press && timerExists) doublePress = true;

        if (release) {
            this.longPressHeld = false;
            return;
        }

        if (shift && (control === MixtrackPlatinumFX.PadModeControls.D)
            && (this.currentMode === this.modes[MixtrackPlatinumFX.PadModes.KEYPLAY])) {
            // In this specific case we aren't setting a mode, we change the parameter for pitch play start
            this.currentMode.nextRange();
            return;
        }

        const doublePressSame = doublePress && (control === this.doubleFirstControl);

        if (doublePress) {
            engine.stopTimer(this.longPressTimer);
            this.longPressTimer = 0;
        }

        if (!doublePressSame) { // Not a double press on the same button
            // First press
            this.longPressHeld = true;

            this.doubleFirstControl = control;

            // Start the long press timer
            const refToPadModeObject = this; // Can't use 'this' in function below
            this.longPressTimer = engine.beginTimer(components.Button.prototype.longPressTimeout/**2*/, function() {
                    refToPadModeObject.longPressTimer = 0;

                    if (refToPadModeObject.longPressHeld) {
                        // If we get to here the timer has expired and the button is still held, go to layer 2
                        refToPadModeObject.longPressHeld = false;

                        if (shift)
                            refToPadModeObject.setMode(channel, control, 4); // Layer 4, shift-long press
                        else
                            refToPadModeObject.setMode(channel, control, 2); // Layer 2, long press
                    }
                }, true);
        }

        let desiredLayer = 0;

        if (shift) {
            if (doublePressSame) desiredLayer = 5;
            else                 desiredLayer = 1;
        } else {
            if (doublePressSame) desiredLayer = 3;
            else                 desiredLayer = 0;
        }

        this.setMode(channel, control, desiredLayer);
    };

    this.setMode = function(channel, control, desiredLayer) {
        // channel = which deck. control = which mode button was pressed. desiredLayer = standard/shifted/longpress/doublepress

        // Look up the new mode from the arrays
        let newModeIndex = MixtrackPlatinumFX.PadModes.NONE;

        switch(control) {
            case MixtrackPlatinumFX.PadModeControls.A:
                newModeIndex = MixtrackPlatinumFX.PadModeLayerConfig.A[desiredLayer];
                break;
            case MixtrackPlatinumFX.PadModeControls.B:
                newModeIndex = MixtrackPlatinumFX.PadModeLayerConfig.B[desiredLayer];
                break;
            case MixtrackPlatinumFX.PadModeControls.C:
                newModeIndex = MixtrackPlatinumFX.PadModeLayerConfig.C[desiredLayer];
                break;
            case MixtrackPlatinumFX.PadModeControls.D:
                newModeIndex = MixtrackPlatinumFX.PadModeLayerConfig.D[desiredLayer];
                break;
        }

        if (newModeIndex === MixtrackPlatinumFX.PadModes.NONE) {
            return;
        }

        // Now convert integer from array to the actual mode object
        let newMode = this.modes[newModeIndex];

        if (newMode === this.currentMode) return;

        if (this.currentMode !== MixtrackPlatinumFX.PadModes.NONE) {
            this.currentMode.forEachComponent(function(component) {
                component.disconnect();
            });
        }

        if (MixtrackPlatinumFX.enableBlink) {
            // stop blinking if old mode was layer > 0 (shift ...)
            if (this.currentLayer !== 0) {
                this.blinkLedOff();

                // disable light on the old control in case it ended up in 0x7F state
                midi.sendShortMsg(0x90 + channel, this.currentModeButton, 0x01);
            }
        }

        // light off on old mode select button
        if (this.currentModeButton != MixtrackPlatinumFX.PadModeControls.NONE) {
            midi.sendShortMsg(0x90 + channel, this.currentModeButton, 0x01);
        }

        // Switch the mode here
        this.currentMode = newMode;
        this.currentLayer = desiredLayer;
        this.currentModeButton = control;

        // set the correct shift state for new mode
        if (this.isShifted) {
            this.currentMode.shift();
        } else {
            this.currentMode.unshift();
        }

        this.currentMode.forEachComponent(function(component) {
            component.connect();
            component.trigger();
        });
        if (this.currentMode.activate) {
            this.currentMode.activate();
        }

        if (MixtrackPlatinumFX.enableBlink) {
            // start blinking if new mode is a secondary mode
            if (this.currentLayer !== 0) {
                this.blinkLedOn(0x90 + channel, this.currentModeButton, this.currentMode.lightOnValue, (this.currentLayer === 2));
            }
        }

        // light on on new mode select button
        midi.sendShortMsg(0x90 + channel, this.currentModeButton, this.currentMode.lightOnValue);
    };

    this.padPress = function(channel, control, value, status, group) {
        const i = (control - 0x14) % 8;
        this.currentMode.pads[i].input(channel, control, value, status, group);
    };

    // start an infinite timer that toggles led state
    this.blinkLedOn = function(midi1, midi2, onVal, slow) {
        this.blinkLedOff();
        this.blinkTimer = MixtrackPlatinumFX.BlinkStart(function(isOn) {
            midi.sendShortMsg(midi1, midi2, isOn ? onVal : 0x01);
        }, slow);
    };

    // stop the blink timer
    this.blinkLedOff = function() {
        if (this.blinkTimer === 0) {
            return;
        }

        MixtrackPlatinumFX.BlinkStop(this.blinkTimer);
        this.blinkTimer = 0;
    };

    this.disablePadLights = function() {
        for (let i = 0; i < 16; i++) { // 0-7 = unshifted; 8-15 = shifted
            midi.sendShortMsg(0x93 + deckNumber, 0x14 + i, 0x01);
        }
    };

    // Set initial mode to the first layer on button A
    this.setMode(deckNumber + 3, MixtrackPlatinumFX.PadModeControls.A, 0); // midi channels are 4,5,6,7
};
MixtrackPlatinumFX.PadSection.prototype = Object.create(components.ComponentContainer.prototype);

MixtrackPlatinumFX.ModeHotcue = function(deckNumber, exactMode) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x7F;

    let offset = 0;
    if (exactMode === MixtrackPlatinumFX.PadModes.HOTCUES2) offset = 8;

    this.pads = new components.ComponentContainer();
    for (let i = 0; i < 8; i++) {
        this.pads[i] = new components.HotcueButton({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            number: i + 1 + offset,
            shiftControl: true,
            sendShifted: true,
            shiftOffset: 0x08,
            outConnect: false
        });
    }
};
MixtrackPlatinumFX.ModeHotcue.prototype = Object.create(components.ComponentContainer.prototype);

MixtrackPlatinumFX.ModeAutoLoop = function(deckNumber, exactMode) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x7F;

    this.pads = new components.ComponentContainer();
    for (let i = 0; i < 8; i++) {
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            size: MixtrackPlatinumFX.autoLoopSizes[i],
            shiftControl: true,
            sendShifted: true,
            shiftOffset: 0x08,
            shift: function() {
                if (exactMode === MixtrackPlatinumFX.PadModes.AUTOLOOP1) {
                    this.inKey = `beatlooproll_${  this.size  }_activate`;
                    this.outKey = `beatlooproll_${  this.size  }_activate`;
                } else { // AUTOLOOP2
                    this.inKey = `beatloop_${  this.size  }_toggle`;
                    this.outKey = `beatloop_${  this.size  }_enabled`;
                }
            },
            unshift: function() {
                if (exactMode === MixtrackPlatinumFX.PadModes.AUTOLOOP1) {
                    this.inKey = `beatloop_${  this.size  }_toggle`;
                    this.outKey = `beatloop_${  this.size  }_enabled`;
                } else { // AUTOLOOP2
                    this.inKey = `beatlooproll_${  this.size  }_activate`;
                    this.outKey = `beatlooproll_${  this.size  }_activate`;
                }
            },
            outConnect: false
        });
    }
};
MixtrackPlatinumFX.ModeAutoLoop.prototype = Object.create(components.ComponentContainer.prototype);

MixtrackPlatinumFX.ModeCueLoop = function(deckNumber) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x7F;

    this.pads = new components.ComponentContainer();
    for (let i = 0; i < 8; i++) {
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            size: MixtrackPlatinumFX.autoLoopSizes[i],
            shiftControl: true,
            sendShifted: true,
            shiftOffset: 0x08,
            keynum: i,
            shift: function() {
                this.input=function(channel, control, value, _status, _group) {
                    engine.setValue(this.group, "slip_enabled", value);
                    engine.setValue(this.group, `hotcue_${  this.keynum+1  }_activate`, value);
                    engine.setValue(this.group, "beatlooproll_activate", value);
                    midi.sendShortMsg(this.midi[0], this.midi[1] + this.shiftOffset, this.outValueScale(engine.getValue(this.group, `hotcue_${  this.keynum+1  }_enabled`)));
                };
                midi.sendShortMsg(this.midi[0], this.midi[1] + this.shiftOffset, this.outValueScale(engine.getValue(this.group, `hotcue_${  this.keynum+1  }_enabled`)));
            },
            unshift: function() {
                this.input=function(channel, control, value, _status, _group) {
                    if (value > 0) {
                        engine.setValue(this.group, `hotcue_${  this.keynum+1  }_activate`, value);
                        script.triggerControl(this.group, "beatloop_activate");
                    } else {
                        engine.setValue(this.group, `hotcue_${  this.keynum+1  }_activate`, value);
                    }
                    midi.sendShortMsg(this.midi[0], this.midi[1], this.outValueScale(engine.getValue(this.group, `hotcue_${  this.keynum+1  }_enabled`)));
                };
                midi.sendShortMsg(this.midi[0], this.midi[1], this.outValueScale(engine.getValue(this.group, `hotcue_${  this.keynum+1  }_enabled`)));
            },
            outConnect: false
        });
    }
};
MixtrackPlatinumFX.ModeCueLoop.prototype = Object.create(components.ComponentContainer.prototype);

MixtrackPlatinumFX.mykey=0;
MixtrackPlatinumFX.ModeKeyPlay = function(deckNumber) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x7F;

    this.nextRange = function() {
        switch (this.pads.keyshiftStart) {
        case 0:
            this.pads.keyshiftStart=4;
            break;
        case 4:
            this.pads.keyshiftStart=7;
            break;
        case 7:
            this.pads.keyshiftStart=0;
            break;
        default:
            this.pads.keyshiftStart=4;
            break;
        }
    };

    this.pads = new components.ComponentContainer();
    const parentPads_ = this.pads;
    this.pads.cueP=1;
    this.pads.keyshiftStart=4;
    for (let i = 0; i < 8; i++) {
        this.pads[i] = new components.Button({
            parentPads: parentPads_,
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            shiftOffset: 0x08,
            keynum: i,
            shift: function() {
                this.input=function(channel, control, value, _status, _group) {
                    if (value>0) {
                        this.parentPads.cueP=this.keynum+1;
                    }
                };
                this.off=components.Button.prototype.off;
                midi.sendShortMsg(this.midi[0], this.midi[1] + this.shiftOffset, this.outValueScale(engine.getValue(this.group, `hotcue_${  this.keynum+1  }_enabled`)));
            },
            unshift: function() {
                // serato has them the opposite way to how I'd expect so shift the two rows around
                const thiskeynum=((this.keynum+4)%8);
                this.thiskey=thiskeynum-this.parentPads.keyshiftStart;
                this.input=function(channel, control, value, _status, _group) {
                    if (value>0) {
                        engine.setValue(this.group, "pitch_adjust", this.thiskey);
                        MixtrackPlatinumFX.mykey=this.keynum;
                        this.parentPads.forEachComponent(function(apad) { apad.output(0); });
                        this.output(value);
                    } else {
                        if (this.keynum===MixtrackPlatinumFX.mykey) {
                            //engine.setValue(this.group,"key",engine.getValue(this.group,"file_key"));
                        }
                    }
                    engine.setValue(this.group, `hotcue_${  this.parentPads.cueP  }_activate`, value);
                };
                this.off=thiskeynum===this.parentPads.keyshiftStart?5:components.Button.prototype.off;
                if (engine.getValue(this.group, "pitch_adjust")===this.thiskey) {
                    this.output(0x7F);
                } else {
                    this.output(0);
                }
            },
            trigger: function() {
                this.output(0);

            },
        });
    }
};
MixtrackPlatinumFX.ModeKeyPlay.prototype = Object.create(components.ComponentContainer.prototype);

// when pads are in "fader cuts" mode, they rapidly move the crossfader.
// holding a pad activates a "fader cut", releasing it causes the GUI crossfader
// to return to the position of physical crossfader
MixtrackPlatinumFX.ModeFaderCuts = function(deckNumber, exactMode) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x09; // for "fader cuts" 0x09 works better than 0x7F for some reason (0x7F turns the other lamps to a bit brighter)

    this.activate = function() {
        // fadercut pads are controlled by hardware of firmware in this mode
        if (exactMode === MixtrackPlatinumFX.PadModes.FADERCUTS2) {
            midi.sendSysexMsg(MixtrackPlatinumFX.faderCutSysex8, MixtrackPlatinumFX.faderCutSysex8.length);
        } else {
            midi.sendSysexMsg(MixtrackPlatinumFX.faderCutSysex4, MixtrackPlatinumFX.faderCutSysex4.length);
        }
    };

    let numFader=4;
    if (exactMode === MixtrackPlatinumFX.PadModes.FADERCUTS2) {
        numFader=8;
    }
    this.pads = new components.ComponentContainer();
    let i;
    for (i = 0; i < numFader; i++) {
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            input: function(channel, control, value, _status, _group) {
                this.output(value);
            },
            trigger: function() {
                // in "fader cuts" mode pad lights need to be disabled manually,
                // as pads are controlled by hardware or firmware in this mode
                // and don't have associated controls. without this, lights from
                // previously selected mode would still be on after changing mode
                // to "fader cuts"
                this.output(0);
            },
            outConnect: false,
        });
    }
    if (exactMode === MixtrackPlatinumFX.PadModes.FADERCUTS1) {
        i=4;
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            key: "play_stutter",
            outConnect: false,
        });
        i++;
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            key: "start",
            outConnect: false,
        });
        i++;
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            key: "back",
            outConnect: false,
        });
        i++;
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            key: "fwd",
            outConnect: false,
        });
    }
    if (exactMode === MixtrackPlatinumFX.PadModes.FADERCUTS3) {
        i=4;
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            key: "reverseroll",
            outConnect: false,
        });
        i++;
        this.pads[i] = new components.Button({
            type: 2,
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            key: "reverse",
            outConnect: false,
        });
        i++;
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            shift: function() {
                this.disconnect();
                this.inKey = "reset_key";
                this.outKey = "reset_key";
            },
            unshift: function() {
                this.disconnect();
                this.inKey = "sync_key";
                this.outKey = "sync_key";
            },
            outConnect: false,
        });
        i++;
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            outConnect: false,
            unshift: function() {
                this.disconnect();
                this.input = function(channel, control, value, _status, _group) {
                    if (value>0) {
                        const prelen = bpm.tap.length;
                        const predelta = bpm.previousTapDelta;
                        bpm.tapButton(deckNumber);
                        // if the array reset, or changed then the tap was "accepted"
                        if ((bpm.tap.length===0) || (bpm.tap.length!==prelen) || predelta!==bpm.previousTapDelta) {
                            this.send(this.outValueScale(value));
                        } else {
                            this.send(0);
                        }
                    } else {
                        this.send(this.outValueScale(value));
                    }
                };
            },
            shift: function() {
                // reset rate to 0 (i.e. no tempo change)
                this.disconnect();
                this.input = function(channel, control, value, _status, _group) {
                    if (value>0) {
                        engine.setValue(this.group, "rate", 0);
                    }
                };
            },
        });
    }
};
MixtrackPlatinumFX.ModeFaderCuts.prototype = Object.create(components.ComponentContainer.prototype);


MixtrackPlatinumFX.ModeStems = function(deckNumber) {
    components.ComponentContainer.call(this);

    //    this.lightOnValue = 0x7F;
    this.lightOnValue = 0x09; // for "fader cuts" 0x09 works better than 0x7F for some reason (0x7F turns the other lamps to a bit brighter)

    this.activate = function() {
        midi.sendSysexMsg(MixtrackPlatinumFX.faderCutSysex4, MixtrackPlatinumFX.faderCutSysex4.length);

    };

    this.pads = new components.ComponentContainer();
    for (let i = 0; i < 4; i++) { // Borrowed from fader cuts
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            input: function(channel, control, value, _status, _group) {
                this.output(value);
            },
            trigger: function() {
                // in "fader cuts" mode pad lights need to be disabled manually,
                // as pads are controlled by hardware or firmware in this mode
                // and don't have associated controls. without this, lights from
                // previously selected mode would still be on after changing mode
                // to "fader cuts"
                this.output(0);
            },
            outConnect: false,
        });
    }

    for (let i = 4; i < 8; i++) {
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }_Stem${i-3}]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            key: "mute",
            type: components.Button.prototype.types.toggle,
            on: 0x01,
            off: 0x7F,
            outConnect: false
        });
    }
};
MixtrackPlatinumFX.ModeStems.prototype = Object.create(components.ComponentContainer.prototype);

MixtrackPlatinumFX.ModePreview = function(deckNumber) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x7F;

    this.pads = new components.ComponentContainer();

    const button = {
        /*        group: `[PreviewDeck${  deckNumber  }]`,  */
        group: "[PreviewDeck1]",
        shiftControl: false,
        midi: 0,
        unshift: 0,
        outConnect: false
    };

    button.midi = [0x93 + deckNumber, 0x14];
    button.unshift = function() {
        this.inKey = "LoadSelectedTrack";
        this.outKey = "LoadSelectedTrack";
    };
    this.pads[0] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x15];
    button.unshift = function() {
        this.inKey = "play";
        this.outKey = "play";
    };
    this.pads[1] = new components.PlayButton(button);

    button.midi = [0x93 + deckNumber, 0x16];
    button.unshift = function() {
        this.inKey = "beatjump_64_backward";
        this.outKey = "beatjump_64_backward";
    };
    this.pads[2] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x17];
    button.unshift = function() {
        this.inKey = "beatjump_64_forward";
        this.outKey = "beatjump_64_forward";
    };
    this.pads[3] = new components.Button(button);

    // --

    button.midi = [0x93 + deckNumber, 0x18];
    button.unshift = function() {
        this.inKey = "LoadSelectedTrackAndPlay";
        this.outKey = "LoadSelectedTrackAndPlay";
    };
    this.pads[4] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x19];
    button.unshift = function() {
        this.inKey = "cue_default";
        this.outKey = "cue_default";
    };
    this.pads[5] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x20];
    button.unshift = function() {
        this.inKey = "back";
        this.outKey = "back";
    };
    this.pads[6] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x21];
    button.unshift = function() {
        this.inKey = "fwd";
        this.outKey = "fwd";
    };
    this.pads[7] = new components.Button(button);

};
MixtrackPlatinumFX.ModePreview.prototype = Object.create(components.ComponentContainer.prototype);

MixtrackPlatinumFX.ModeSample = function(deckNumber, exactMode) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x7F;

    if (exactMode === MixtrackPlatinumFX.PadModes.SAMPLE1) {
        // samples 1-8
        this.firstSampleNumber = 1;
    } else { // SAMPLE2
        // samples 9-16
        this.firstSampleNumber = 9;
    }

    this.pads = new components.ComponentContainer();
    for (let i = 0; i < 8; i++) {
        this.pads[i] = new components.SamplerButton({
            midi: [0x93 + deckNumber, 0x14 + i],
            number: this.firstSampleNumber + i,
            shiftControl: true,
            sendShifted: true,
            shiftOffset: 0x08,
            outConnect: false,
            loaded: 0x05,
            looping: 0x0F,
            playing: 0x0F,
        });
    }
};
MixtrackPlatinumFX.ModeSample.prototype = Object.create(components.ComponentContainer.prototype);

MixtrackPlatinumFX.ModeBeatjump = function(deckNumber) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x7F;

    this.pads = new components.ComponentContainer();
    for (let i = 0; i < 8; i++) {
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            size: MixtrackPlatinumFX.beatJumpValues[i],
            shiftControl: true,
            sendShifted: true,
            shiftOffset: 0x08,
            shift: function() {
                this.disconnect();
                this.inKey = `beatjump_${  this.size  }backward`;
                this.outKey = `beatjump_${  this.size  }backward`;
                this.connect();
                this.trigger();
            },
            unshift: function() {
                this.disconnect();
                this.inKey = `beatjump_${  this.size  }forward`;
                this.outKey = `beatjump_${  this.size  }forward`;
                this.connect();
                this.trigger();
            },
            outConnect: false
        });
    }
};
MixtrackPlatinumFX.ModeBeatjump.prototype = Object.create(components.ComponentContainer.prototype);

MixtrackPlatinumFX.ModeBeatjump2 = function(deckNumber) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x7F;

    let beatJump2Values = [
        "beatjump_4_backward",
        "beatjump_4_forward",
        "beatjump_8_backward",
        "beatjump_8_forward",
        "beatjump_16_backward",
        "beatjump_16_forward",
        "beatjump_32_backward",
        "beatjump_32_forward"
        ];

    this.pads = new components.ComponentContainer();
    for (let i = 0; i < 8; i++) {
        this.pads[i] = new components.Button({
            group: `[Channel${  deckNumber  }]`,
            midi: [0x93 + deckNumber, 0x14 + i],
            size: beatJump2Values[i],
            shiftControl: true,
            sendShifted: true,
            shiftOffset: 0x08,
            shift: function() {
                this.disconnect();
                this.inKey = this.size;
                this.outKey = this.size;
                this.connect();
                this.trigger();
            },
            unshift: function() {
                this.disconnect();
                this.inKey = this.size;
                this.outKey = this.size;
                this.connect();
                this.trigger();
            },
            outConnect: false
        });
    }
};
MixtrackPlatinumFX.ModeBeatjump2.prototype = Object.create(components.ComponentContainer.prototype);


MixtrackPlatinumFX.ModeCustom1 = function(deckNumber) {
    components.ComponentContainer.call(this);

    this.lightOnValue = 0x7F;

    this.pads = new components.ComponentContainer();

    const button = {
        group: `[Channel${  deckNumber  }]`,
        shiftControl: false,
        midi: 0,
        unshift: 0,
        outConnect: false
    };

    button.midi = [0x93 + deckNumber, 0x14];
    button.unshift = function() {
        this.inKey = "beatlooproll_0.125_activate";
        this.outKey = "beatlooproll_0.125_activate";
    };
    this.pads[0] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x15];
    button.unshift = function() {
        this.inKey = "beatlooproll_0.25_activate";
        this.outKey = "beatlooproll_0.25_activate";
    };
    this.pads[1] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x16];
    button.unshift = function() {
        this.inKey = "beatlooproll_0.5_activate";
        this.outKey = "beatlooproll_0.5_activate";
    };
    this.pads[2] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x17];
    button.unshift = function() {
        this.inKey = "beatlooproll_1_activate";
        this.outKey = "beatlooproll_1_activate";
    };
    this.pads[3] = new components.Button(button);

    // --

    button.midi = [0x93 + deckNumber, 0x18];
    button.unshift = function() {
        this.inKey = "reverseroll";
        this.outKey = "reverseroll";
    };
    this.pads[4] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x19];
    button.unshift = function() {
        this.inKey = "start";
        this.outKey = "start";
    };
    this.pads[5] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x20];
    button.unshift = function() {
        this.inKey = "back";
        this.outKey = "back";
    };
    this.pads[6] = new components.Button(button);

    button.midi = [0x93 + deckNumber, 0x21];
    button.unshift = function() {
        this.inKey = "fwd";
        this.outKey = "fwd";
    };
    this.pads[7] = new components.Button(button);
};
MixtrackPlatinumFX.ModeCustom1.prototype = Object.create(components.ComponentContainer.prototype);


MixtrackPlatinumFX.Browse = function() {
    this.knob = new components.Encoder({
        speed: 0,
        speedTimer: 0,
        shiftControl: true,
        shiftOffset: 0x01,
        input: function(channel, control, value) {
            let direction;
            if (MixtrackPlatinumFX.shifted && MixtrackPlatinumFX.shiftBrowseIsZoom) {
                direction = (value > 0x40) ? "up" : "down";
                engine.setParameter("[Channel1]", `waveform_zoom_${  direction}`, 1);

                // need to zoom both channels if waveform sync is disabled in Mixxx settings.
                // and when it's enabled then no need to zoom 2nd channel, as it will cause
                // the zoom to jump 2 levels at once
                if (!MixtrackPlatinumFX.waveformsSynced) {
                    engine.setParameter("[Channel2]", `waveform_zoom_${  direction}`, 1);
                }
            } else {
                const focussedLibraryWidget = engine.getValue("[Library]", "focused_widget");

                if ((focussedLibraryWidget === 3) || (MixtrackPlatinumFX.saveLibraryFocussedWidget === 3)) {
                    // Either (real focus is playlist) or (Mixxx is unfocussed and the playlist was last focussed)

                    if (this.speedTimer !== 0) {
                        engine.stopTimer(this.speedTimer);
                        this.speedTimer = 0;
                    }
                    this.speedTimer = engine.beginTimer(100, function() {
                        MixtrackPlatinumFX.browse.knob.speed = 0;
                        MixtrackPlatinumFX.browse.knob.speedTimer = 0;
                    }, true);
                    this.speed++;
                    direction = (value > 0x40) ? value - 0x80 : value;
                    if (MixtrackPlatinumFX.shifted) {
                        // when shifted go fast (consecutive squared!)
                        direction *= this.speed*this.speed;
                    } else {
                        // normal, up to 3 consecutive do one for fine control, then speed up
                        if (this.speed>3) { direction *= Math.min(4, (this.speed-3)); }
                    }

                    if (focussedLibraryWidget) {
                        // Mixxx is focussed, use the recommended Control
                        engine.setParameter("[Library]", "MoveVertical", direction);
                    } else {
                        // Mixxx is unfocussed - the above won't work. Instead use deprecated Controls
                        // Hopefully this hack can be removed one day
                        engine.setValue("[Playlist]", "SelectTrackKnob", direction);
                    }
                } else if (focussedLibraryWidget === 2) {
                    // Mixxx is focussed on the side bar list, use the recommended Control
                    engine.setParameter("[Library]", "MoveVertical", (value === 0x01) ? 1 : -1);
                } else if (MixtrackPlatinumFX.saveLibraryFocussedWidget === 2) {
                    // Mixxx is unfocussed as was last focussed on the side bar list
                    // The above won't work. Instead use deprecated Controls
                    // Hopefully this hack can be removed one day
                    if (value === 0x01) {
                        engine.setValue("[Playlist]", "SelectNextPlaylist", 1);
                    } else if (value === 0x7F) {
                        engine.setValue("[Playlist]", "SelectPrevPlaylist", 1);
                    }
                }
                /*
                } else if (MixtrackPlatinumFX.saveLibraryFocussedWidget === 1) {
                    Is there a way to scroll the search box from here?
                }
*/
            }
        }
    });

    this.knobButton = new components.Button({
        group: "[Library]",
        shiftControl: true,
        shiftOffset: 0x01,
        previewing: false,
        shift: function() {
            this.inKey = "GoToItem";
            this.input = function(channel, control, value, _status, _group) {
                if (value>0) {
                    if (MixtrackPlatinumFX.rightShift) {
                        if (this.previewing) {
                            script.triggerControl("[PreviewDeck1]", "stop");
                            this.previewing = false;
                        } else {
                            script.triggerControl("[PreviewDeck1]", "LoadSelectedTrackAndPlay");
                            this.previewing = true;
                        }
                    } else {
                        // Just handle shift-knob when on sidebar
                        if ((MixtrackPlatinumFX.saveLibraryFocussedWidget === 2)) {
                            engine.setValue("[Playlist]", "ToggleSelectedSidebarItem", 1);
                        }
                    }
                }
            };
        },
        unshift: function() {
            this.input = function(channel, control, value, _status, _group) {

                if (value !== 0x7F) { return; } // Filter all except button-down event

                if (MixtrackPlatinumFX.mixxxFocussed) {
                    script.triggerControl("[Library]", "MoveFocusForward");
                } else {
                    // Mixxx is unfocussed
                    switch (MixtrackPlatinumFX.saveLibraryFocussedWidget) {
                    case 1: // Search box. Switch to side bar
                        MixtrackPlatinumFX.saveLibraryFocussedWidget = 2;
                        break;
                    case 2: // Side bar. Switch to playlist
                        MixtrackPlatinumFX.saveLibraryFocussedWidget = 3;
                        break;
                    case 3: // Playlist. Switch to search box
                        MixtrackPlatinumFX.saveLibraryFocussedWidget = 1;
                        break;
                    }
                }
            };
        }
    });
};
MixtrackPlatinumFX.Browse.prototype = new components.ComponentContainer();

MixtrackPlatinumFX.libraryFocussedWidgetCallback = function(value, _group, _control) {
    if (!MixtrackPlatinumFX.mixxxFocussed) {
        // Mixxx is regaining focus. Try to set the focus to where we think it is
        engine.setValue("[Library]", "focused_widget", MixtrackPlatinumFX.saveLibraryFocussedWidget);
        MixtrackPlatinumFX.mixxxFocussed = true;
    }

    if (value !== 0) { // Window is focussed - just save which widget is active
        MixtrackPlatinumFX.saveLibraryFocussedWidget = value;
    } else {
        MixtrackPlatinumFX.mixxxFocussed = false;
    }
};

MixtrackPlatinumFX.Gains = function() {
    this.mainGain = new components.Pot({
        group: "[Master]",
        inKey: "gain"
    });

    this.cueGain = new components.Pot({
        group: "[Master]",
        inKey: "headGain",
        shift: function() {
            this.disconnect();
            this.group = "[Sampler1]";
            this.inKey = "pregain";
            this.input = function(channel, control, value, _status, _group) {
                const newValue = this.inValueScale(value);
                for (let i=1; i<=16; i++) {
                    engine.setParameter(`[Sampler${  i  }]`, "pregain", newValue);
                }
            };
        },
        unshift: function() {
            this.disconnect();
            this.firstValueReceived=false;
            this.group = "[Master]";
            this.inKey = "headGain";
            this.input = components.Pot.prototype.input;
        },
    });

    this.cueMix = new components.Pot({
        group: "[Master]",
        inKey: "headMix"
    });
};
MixtrackPlatinumFX.Gains.prototype = new components.ComponentContainer();

MixtrackPlatinumFX.vuCallback = function(value, group) {
    const level = value * 90;
    const deckOffset = script.deckFromGroup(group) - 1;
    midi.sendShortMsg(0xB0 + deckOffset, 0x1F, level);
};

MixtrackPlatinumFX.wheelTouch = function(channel, control, value) {
    const deckNumber = channel + 1;

    if (!MixtrackPlatinumFX.shifted && MixtrackPlatinumFX.deck[channel].scratchModeEnabled && value === 0x7F) {
        // touch start

        engine.scratchEnable(deckNumber, MixtrackPlatinumFX.jogScratchSensitivity, 33+1/3, MixtrackPlatinumFX.jogScratchAlpha, MixtrackPlatinumFX.jogScratchBeta, true);
    } else if (value === 0) {
        // touch end
        engine.scratchDisable(deckNumber, true);
    }
};

MixtrackPlatinumFX.wheelTurn = function(channel, control, value, status, group) {
    const deckNumber = channel + 1;

    let newValue = value;

    if (value >= 64) {
        // correct the value if going backwards
        newValue -= 128;
    }

    if (MixtrackPlatinumFX.shifted) {
        // seek
        const oldPos = engine.getValue(group, "playposition");

        engine.setValue(group, "playposition", oldPos + newValue / MixtrackPlatinumFX.jogSeekSensitivity);
    } else if (MixtrackPlatinumFX.deck[channel].scratchModeEnabled && engine.isScratching(deckNumber)) {
        // scratch
        engine.scratchTick(deckNumber, newValue);
    } else {
        // pitch bend
        engine.setValue(group, "jog", newValue / MixtrackPlatinumFX.jogPitchSensitivity);
    }
};

MixtrackPlatinumFX.timeElapsedCallback = function(value, _group, _control) {
    // 0 = elapsed
    // 1 = remaining
    // 2 = both (we ignore this as the controller can't show both)
    let onoff;
    if (value === 0) {
        // show elapsed
        onoff = 0x00;
    } else if (value === 1) {
        // show remaining
        onoff = 0x7F;
    } else {
        // both, ignore the event
        return;
    }

    // update all 4 decks on the controller
    midi.sendShortMsg(0x90, 0x46, onoff);
    midi.sendShortMsg(0x91, 0x46, onoff);
    midi.sendShortMsg(0x92, 0x46, onoff);
    midi.sendShortMsg(0x93, 0x46, onoff);
};

MixtrackPlatinumFX.timeMs = function(deck, position, duration) {
    return Math.round(duration * position * 1000);
};

MixtrackPlatinumFX.encodeNumToArray = function(number, drop, unsigned) {
    const numberarray = [
        (number >> 28) & 0x0F,
        (number >> 24) & 0x0F,
        (number >> 20) & 0x0F,
        (number >> 16) & 0x0F,
        (number >> 12) & 0x0F,
        (number >> 8) & 0x0F,
        (number >> 4) & 0x0F,
        number & 0x0F,
    ];

    if (drop !== undefined) {
        numberarray.splice(0, drop);
    }

    if (number < 0) { numberarray[0] = 0x07; } else if (!unsigned) { numberarray[0] = 0x08; }

    return numberarray;
};

MixtrackPlatinumFX.sendScreenDurationMidi = function(deck, duration) {
    if (duration < 1) {
        duration = 1;
    }
    const durationArray = MixtrackPlatinumFX.encodeNumToArray(duration - 1);

    const bytePrefix = [0xF0, 0x00, 0x20, 0x7F, deck, 0x03];
    const bytePostfix = [0xF7];
    const byteArray = bytePrefix.concat(durationArray, bytePostfix);
    midi.sendSysexMsg(byteArray, byteArray.length);
};

MixtrackPlatinumFX.sendScreenTimeMidi = function(deck, time) {
    const timeArray = MixtrackPlatinumFX.encodeNumToArray(time);

    const bytePrefix = [0xF0, 0x00, 0x20, 0x7F, deck, 0x04];
    const bytePostfix = [0xF7];
    const byteArray = bytePrefix.concat(timeArray, bytePostfix);
    midi.sendSysexMsg(byteArray, byteArray.length);
};

MixtrackPlatinumFX.sendScreenBpmMidi = function(deck, bpm) {
    if (MixtrackPlatinumFX.hideBPM) { return; }

    const bpmArray = MixtrackPlatinumFX.encodeNumToArray(bpm);
    bpmArray.shift();
    bpmArray.shift();

    const bytePrefix = [0xF0, 0x00, 0x20, 0x7F, deck, 0x01];
    const bytePostfix = [0xF7];
    const byteArray = bytePrefix.concat(bpmArray, bytePostfix);
    midi.sendSysexMsg(byteArray, byteArray.length);

    MixtrackPlatinumFX.updateArrows();
};

MixtrackPlatinumFX.rightShift=false;
MixtrackPlatinumFX.shiftToggle = function(channel, control, value, status, _group) {
    if (value === 0x7F) {
        if (status===0x91 || status===0x93) {
            MixtrackPlatinumFX.rightShift=true;
        }
        MixtrackPlatinumFX.shift();
    } else {
        MixtrackPlatinumFX.rightShift=false;
        MixtrackPlatinumFX.unshift();
    }
};

MixtrackPlatinumFX.deckSwitch = function(channel, control, value, _status, _group) {
    // Ignore the release the deck switch callback
    // called both when actually releasing the button and for the alt deck when switching
    if (value) {
        const deck = channel;
        MixtrackPlatinumFX.deck[deck].setActive(value === 0x7F);
        // turn "off" the other deck
        // this can't reliably be done with the release as it also trigger for this deck when the button is released
        let other = 4-deck;
        if (deck===0 || deck===2) { other = 2-deck; }
        MixtrackPlatinumFX.deck[other].setActive(false);
        // also zero vu meters
        if (value === 0x7F) {
            midi.sendShortMsg(0xBF, 0x44, 0);
            midi.sendShortMsg(0xBF, 0x45, 0);
        }
        MixtrackPlatinumFX.updateArrows(true);
    }
};

var sendSysex = function(buffer) {
    midi.sendSysexMsg(buffer, buffer.length);
};

MixtrackPlatinumFX.sendScreenRateMidi = function(deck, rate) {
    if (MixtrackPlatinumFX.hideBPM) { return; }

    const rateArray = MixtrackPlatinumFX.encodeNumToArray(rate, 2);

    const bytePrefix = [0xF0, 0x00, 0x20, 0x7F, deck, 0x02];
    const bytePostfix = [0xF7];
    const byteArray = bytePrefix.concat(rateArray, bytePostfix);
    sendSysex(byteArray);
};

// arrow data state (and cache to prevent midi spam)
MixtrackPlatinumFX.arrowsData = {
    arrowsUpdateOn: true,
    uparrow: [0, 0, 0, 0],
    downarrow: [0, 0, 0, 0],
};

// force refresh turns arrow behaviour back to normal, and forces a refresh bypressing the cache
// force show turns both arrows on and suspends normal operation
MixtrackPlatinumFX.updateArrows = function(forceRefresh, forceShow, deck) {
    if (!MixtrackPlatinumFX.initComplete) {
        return;
    }

    if (forceShow) {
        // both arrows on to indicate the deck we are tapping
        midi.sendShortMsg(0x80 | deck, 0x0A, 1);
        midi.sendShortMsg(0x80 | deck, 0x09, 1);
        // and stop other updates changing them
        MixtrackPlatinumFX.arrowsData.arrowsUpdateOn=false;
    } else {
        if (forceRefresh) {
            MixtrackPlatinumFX.arrowsData.arrowsUpdateOn=true;
        }
        if (MixtrackPlatinumFX.arrowsData.arrowsUpdateOn) {
            const activeA = MixtrackPlatinumFX.deck[0].active ? 0 : 2;
            const activeB = MixtrackPlatinumFX.deck[1].active ? 1 : 3;

            const bpmA = engine.getValue(`[Channel${  activeA+1  }]`, "bpm");
            const bpmB = engine.getValue(`[Channel${  activeB+1  }]`, "bpm");

            let i;
            for (i=0; i<4; i++) {
                const bpmMy = engine.getValue(`[Channel${  i+1  }]`, "bpm");
                let bpmAlt = bpmA;
                if (i===0 || i===2) {
                    bpmAlt = bpmB;
                }

                let down=0;
                let up=0;

                // only display if both decks have a bpm
                if (bpmAlt && bpmMy) {
                    // and have a 0.05 bpm tolerance (else they only go off when you use sync)
                    if (bpmAlt>(bpmMy+0.05)) {
                        down=1;
                    }
                    if (bpmAlt<(bpmMy-0.05)) {
                        up=1;
                    }
                }

                if (forceRefresh || MixtrackPlatinumFX.arrowsData.downarrow[i]!==down) {
                    MixtrackPlatinumFX.arrowsData.downarrow[i]=down;
                    midi.sendShortMsg(0x80 | i, 0x0A, down); // down arrow update
                }
                if (forceRefresh || MixtrackPlatinumFX.arrowsData.uparrow[i]!==up) {
                    MixtrackPlatinumFX.arrowsData.uparrow[i]=up;
                    midi.sendShortMsg(0x80 | i, 0x09, up); // up arrow update
                }
            }
        }
    }
};

MixtrackPlatinumFX.rateCallback = function(rate, group, _control)  {
    const channel = script.deckFromGroup(group) - 1;
    const rateEffective = engine.getValue(group, "rateRange") * -rate;

    MixtrackPlatinumFX.sendScreenRateMidi(channel+1, Math.round(rateEffective*10000));
};

MixtrackPlatinumFX.updateRateRange = function(channel, group, range) {
    //engine.setParameter(group, "rateRange", (range-0.01)*0.25);
    engine.setValue(group, "rateRange", range);
    midi.sendShortMsg(0x90+channel, 0x0e, range*100);
};
