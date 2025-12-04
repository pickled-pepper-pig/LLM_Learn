import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io

# 初始化Flask应用
app = Flask(__name__)
CORS(app)  # 添加CORS支持

# 定义并加载模型
model = nn.Linear(784, 10)
model.load_state_dict(torch.load('../model/mnist_model.pth', map_location=torch.device('cpu')))
model.eval()

# 定义图像预处理
transform = transforms.Compose([
    transforms.Resize((28, 28)),
    transforms.Grayscale(),
    transforms.ToTensor(),
    transforms.Lambda(lambda x: 1 - x),  # 反转颜色，确保是白底黑字
    transforms.Lambda(lambda x: x.view(-1))
])

@app.route('/')
def index():
    return jsonify({'message': 'MNIST手写数字识别API已启动，请访问前端应用进行手写数字识别'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 获取前端发送的图像数据
        data = request.get_json()
        image_data = data['image']
        
        # 解析base64图像数据
        image_data = image_data.split(',')[1]  # 移除data:image/png;base64,前缀
        image_bytes = base64.b64decode(image_data)
        
        # 转换为PIL图像
        image = Image.open(io.BytesIO(image_bytes))
        
        # 预处理图像
        image_tensor = transform(image)
        
        # 进行预测
        with torch.no_grad():
            outputs = model(image_tensor)
            _, predicted = torch.max(outputs.data, 0)
            prediction = predicted.item()
        
        # 返回预测结果
        return jsonify({'prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)