import VoiceInput from '../VoiceInput';

export default function VoiceInputExample() {
  return (
    <div className="p-4">
      <VoiceInput 
        onVoiceCommand={(transcript) => console.log('Voice command:', transcript)}
      />
    </div>
  );
}