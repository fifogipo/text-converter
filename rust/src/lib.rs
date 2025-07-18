use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use js_sys::Reflect;
use wasm_bindgen::JsValue;
use web_sys::js_sys;
use web_sys::SpeechSynthesisUtterance;

#[wasm_bindgen]
pub fn text_to_speech(input: &str) {
    let window = web_sys::window().unwrap();
    let speech = window.speech_synthesis().unwrap();
    let utterance = SpeechSynthesisUtterance::new_with_text(input).unwrap();

    let voices = speech.get_voices();
    web_sys::console::log(&voices);

    // Cerca la voce desiderata
    let voice_to_use = voices.iter().find(|voice| {
        let name_val = Reflect::get(voice, &JsValue::from_str("name")).unwrap_or(JsValue::NULL);
        let name_str = name_val.as_string().unwrap_or_default();
        name_str == "Shelley (Italiano (Italia))"
    });

    if let Some(voice) = voice_to_use {
        // Imposta la proprietà 'voice' usando Reflect::set
        let _ = Reflect::set(&utterance, &JsValue::from_str("voice"), &voice);
    }

    speech.speak(&utterance);
}

#[wasm_bindgen]
pub fn pause_speech() {
    if let Some(window) = web_sys::window() {
        match window.speech_synthesis() {
            Ok(speech) => speech.pause(),
            Err(err) => web_sys::console::error_1(&err),
        }
    }
}

#[wasm_bindgen]
pub fn resume_speech() {
    if let Some(window) = web_sys::window() {
        match window.speech_synthesis() {
            Ok(speech) => speech.resume(),
            Err(err) => web_sys::console::error_1(&err),
        }
    }
}