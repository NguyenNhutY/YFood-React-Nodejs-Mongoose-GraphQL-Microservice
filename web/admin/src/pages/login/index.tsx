import { AuthPage } from "@refinedev/mui";
import * as faceapi from "face-api.js";
import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

export const Login: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false); // Quản lý trạng thái hiển thị camera
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Quản lý việc hiển thị modal thông báo
  const [notificationMessage, setNotificationMessage] = useState(""); // Lưu thông báo từ kết quả quét

  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        setLoading(false);
      } catch (error) {
        console.error("Error loading face-api models", error);
      }
    };

    if (isScanning) {
      loadModels();
      startVideo();
    }

    return () => {
      stopVideo();
    };
  }, [isScanning]); // Chỉ tải mô hình và mở camera khi bật quét

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error("Error accessing webcam", error));
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Dừng camera khi đóng modal
    }
  };

  const handleLogin = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current)
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (detections.length > 0) {
      const faceData = detections[0].descriptor;
      // Gửi dữ liệu khuôn mặt đến server
      fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faceData }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setNotificationMessage("Đăng nhập thành công!");
          } else {
            setNotificationMessage("Đăng nhập thất bại!");
          }
          setIsNotificationOpen(true); // Mở modal thông báo
        })
        .catch((error) => {
          setNotificationMessage("Đã xảy ra lỗi trong quá trình đăng nhập.");
          setIsNotificationOpen(true); // Mở modal thông báo khi lỗi xảy ra
        });
    } else {
      setNotificationMessage("Không phát hiện khuôn mặt!");
      setIsNotificationOpen(true); // Mở modal thông báo khi không phát hiện khuôn mặt
    }
  };

  // Xử lý việc tắt modal khi bấm vào ngoài modal
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setIsScanning(false); // Tắt modal quét khuôn mặt
      stopVideo(); // Tắt camera
    }
  };

  const handleNotificationOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setIsNotificationOpen(false); // Tắt modal thông báo
    }
  };

  return (
    <>
      <AuthPage
        type='login'
        formProps={{
          defaultValues: { email: "root@gmail.com", password: "1234" },
        }}
      />
      {isScanning && (
        <div className='modal-overlay' onClick={handleOverlayClick}>
          <div className='modal'>
            <video
              ref={videoRef}
              autoPlay
              muted
              width='720'
              height='560'
            ></video>
            <div className='modal-buttons'>
              <button onClick={handleLogin} disabled={loading} className='scan'>
                {loading ? "Đang tải mô hình..." : "Đăng nhập bằng khuôn mặt"}
              </button>
              <button
                onClick={() => {
                  setIsScanning(false);
                  stopVideo(); // Tắt camera khi người dùng nhấn nút đóng
                }}
                className='cancel'
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {!isScanning && (
        <button
          onClick={() => setIsScanning(true)}
          className='bg-blue-500 text-white py-2 px-4 rounded-lg'
        >
          Bắt đầu quét khuôn mặt
        </button>
      )}

      {isNotificationOpen && (
        <div className='modal-overlay' onClick={handleNotificationOverlayClick}>
          <div className='modal'>
            <h2>Kết quả</h2>
            <p>{notificationMessage}</p>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className='bg-blue-500 text-white py-2 px-4 rounded-lg'
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};
