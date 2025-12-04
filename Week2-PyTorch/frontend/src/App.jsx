import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [prediction, setPrediction] = useState('等待识别');
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // 初始化Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // 设置Canvas样式
    context.lineWidth = 15;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    setCtx(context);
  }, []);

  // 绘制线条
  const drawLine = (x1, y1, x2, y2) => {
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  // 开始绘制
  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPosRef.current = { x, y };
  };

  // 绘制中
  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    drawLine(lastPosRef.current.x, lastPosRef.current.y, currentX, currentY);
    lastPosRef.current = { x: currentX, y: currentY };
  };

  // 停止绘制
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // 清除画布
  const clearCanvas = () => {
    if (!ctx) return;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setPrediction('等待识别');
  };

  // 预测数字
  const predictDigit = async () => {
    if (!canvasRef.current) return;
    
    try {
      // 将Canvas内容转换为base64图像数据
      const imageData = canvasRef.current.toDataURL('image/png');
      
      // 发送到后端进行预测
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageData })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setPrediction('识别错误: ' + data.error);
      } else {
        setPrediction(data.prediction);
      }
    } catch (error) {
      setPrediction('网络错误');
      console.error('Error:', error);
    }
  };

  // 触摸事件处理
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setIsDrawing(true);
    lastPosRef.current = { x, y };
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDrawing || !ctx) return;
    
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;
    
    drawLine(lastPosRef.current.x, lastPosRef.current.y, currentX, currentY);
    lastPosRef.current = { x: currentX, y: currentY };
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  return (
    <div className="container">
      <h1>MNIST 手写数字识别</h1>
      <canvas
        ref={canvasRef}
        width="280"
        height="280"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="controls">
        <button className="clear-btn" onClick={clearCanvas}>清除</button>
        <button onClick={predictDigit}>识别</button>
      </div>
      <div className="result">
        预测结果: <span>{prediction}</span>
      </div>
    </div>
  );
}

export default App
