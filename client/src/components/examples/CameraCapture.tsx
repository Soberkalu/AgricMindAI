import CameraCapture from '../CameraCapture';

export default function CameraCaptureExample() {
  return (
    <div className="p-4">
      <CameraCapture 
        onCapture={(imageData) => console.log('Image captured:', imageData)}
      />
    </div>
  );
}