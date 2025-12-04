# MNIST 手写数字识别项目

这是一个基于PyTorch和Flask的MNIST手写数字识别项目，实现了前端手写数字输入、后端模型预测和结果展示的完整流程。

## 功能特点

- ✅ 280×280像素的Canvas手写板，支持鼠标和触摸设备
- ✅ 实时手写数字识别，准确率超过90%
- ✅ 简洁直观的用户界面
- ✅ 支持清除和重新绘制功能
- ✅ 跨平台支持（Windows、macOS、Linux）

## 技术栈

### 后端
- **Python 3.12**：主要开发语言
- **PyTorch**：深度学习框架，用于构建和训练MNIST模型
- **Flask**：Web框架，提供预测API和静态文件服务
- **Pillow**：图像处理库，用于图像预处理

### 前端
- **HTML5**：页面结构
- **CSS3**：样式设计
- **JavaScript**：Canvas交互和AJAX请求

## 安装步骤

### 后端安装

1. 克隆项目到本地：
   ```bash
   git clone <repository-url>
   ```

2. 安装后端依赖：
   ```bash
   pip install -r backend/requirements.txt
   ```

3. 运行后端应用：
   ```bash
   cd backend
   python app.py
   ```

### 模型训练（可选）

如果需要重新训练模型：

1. 安装模型训练依赖：
   ```bash
   pip install -r model/requirements.txt
   ```

2. 运行Jupyter Notebook训练模型：
   ```bash
   cd model
   jupyter notebook mnist.ipynb
   ```

### 前端安装（可选）

如果需要开发或使用React版本的前端：

1. 进入前端目录：
   ```bash
   cd frontend
   ```

2. 安装前端依赖：
   ```bash
   npm install
   ```

3. 运行前端开发服务器：
   ```bash
   npm run dev
   ```

## 使用方法

### 1. 启动后端服务

```bash
cd backend
python app.py
```

后端服务将在 `http://127.0.0.1:5000` 启动，提供预测API接口。

### 2. 启动前端开发服务器

```bash
cd frontend
npm run dev
```

前端开发服务器将在 `http://localhost:5173` 启动，打开浏览器访问此地址即可使用手写数字识别功能。

### 3. 使用步骤

1. 在280×280像素的Canvas手写板上绘制数字
2. 点击"识别"按钮查看预测结果
3. 点击"清除"按钮可以重新绘制

### 4. 界面展示

以下是手写数字识别应用的界面展示：

![手写数字识别界面](image.png)

### 5. 构建前端应用（可选）

如果需要构建前端生产版本：

```bash
cd frontend
npm run build
```

构建后的文件将生成在 `frontend/dist` 目录中。

## 项目结构

```
Week2-PyTorch/
├── .gitignore         # Git忽略文件
├── README.md          # 项目说明文档
├── backend/           # Flask后端应用
│   ├── app.py         # 主应用文件
│   └── requirements.txt # 后端依赖配置
├── frontend/          # React前端应用
│   ├── .gitignore     # 前端Git忽略文件
│   ├── README.md      # 前端说明文档
│   ├── eslint.config.js # ESLint配置
│   ├── index.html     # 前端入口HTML
│   ├── package-lock.json # 前端依赖锁定文件
│   ├── package.json   # 前端依赖配置
│   ├── public/        # 静态资源
│   │   └── vite.svg   # Vite默认图标
│   ├── src/           # 源代码
│   │   ├── App.css    # 主组件样式
│   │   ├── App.jsx    # 主组件
│   │   ├── assets/    # 资产文件夹
│   │   ├── index.css  # 全局样式
│   │   └── main.jsx   # 应用入口
│   └── vite.config.js # Vite配置
└── model/             # 模型相关文件
    ├── data/          # MNIST数据集（自动下载）
    │   └── MNIST/     # MNIST数据文件
    ├── mnist.ipynb    # MNIST模型训练脚本
    ├── mnist_model.pth # 训练好的模型
    └── requirements.txt # 模型训练依赖
```

## 模型介绍

项目使用了一个简单的线性模型（全连接神经网络）：

- 输入层：784个神经元（对应28×28像素的图像）
- 输出层：10个神经元（对应0-9共10个数字）

模型使用交叉熵损失函数和随机梯度下降（SGD）优化器进行训练，训练了20个epoch，最终测试准确率达到91.63%。

## 如何改进

1. **使用更复杂的模型**：可以尝试卷积神经网络（CNN）提高准确率
2. **增加数据增强**：旋转、缩放、平移等操作可以提高模型泛化能力
3. **优化前端界面**：添加更多交互功能，如调整画笔大小、颜色等
4. **部署到生产环境**：使用Gunicorn或uWSGI代替开发服务器

## 许可证

本项目采用MIT许可证，详见LICENSE文件。