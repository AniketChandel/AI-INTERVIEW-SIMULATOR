export function speak(text) {
speechSynthesis.cancel();
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = "en-US";
speechSynthesis.speak(utterance);
}