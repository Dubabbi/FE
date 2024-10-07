import React, { useState, useEffect } from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';

const LoadingModal = ({
  isOpen
}) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setInterval(() => {
        setProgress(prevProgress => {
          const nextProgress = prevProgress + 10;
          if (nextProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return nextProgress;
        });
      }, 300); // 0.3초 마다 진행 상태를 10%씩 증가
      return () => clearInterval(timer);
    } else {
      setLoading(false);
      setProgress(0); // 로딩 완료 또는 모달이 닫힐 때 프로그레스 초기화
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.LoadingContent>
        {loading ? (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <p style={{ color: '#8344B5', fontSize: '1.8rem', marginBottom: '3%' }}>
              피드백 생성 중입니다.
            </p>
            <p style={{ color: '#888', fontSize: '1.4rem', marginBottom: '5%' }}>
              💜잠시만 기다려 주세요!💜
            </p>
            <div className="loading-bar">
              <div className="loading-progress" style={{ width: `${progress}%`, marginBottom: '5%'  }}></div>
            </div>
          </div>
        ) : (
          <p>로딩이 완료되었습니다!</p>
        )}
      </C.LoadingContent>
      <style>{`
        .loading-bar {
          width: 80%;
          margin: auto;
          height: 20px;
          background-color: #f3f3f3;
          border-radius: 25px;
          overflow: hidden;
          position: relative;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(to right, #ff007b, #a826ff);
          border-radius: 25px;
        }
      `}</style>
    </C.ModalOverlay>
  );
};

export default LoadingModal;
