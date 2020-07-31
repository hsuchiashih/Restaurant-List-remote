# 美食餐廳清單
## 環境建置與需求 (prerequisites)：
   Node.js <br>
   express.js
   
## 安裝與執行步驟 (installation and execution)：
   1. 打開你的 terminal，Clone 此專案至本機電腦
   
  ```
  $ git clone https://github.com/hsuchiashih/Restaurant-List-remote.git
  ```
  2. 開啟終端機(Terminal)，進入存放此專案的資料夾
  
  ```
  $ cd Restaurant-List-remote
  ```
  3. 安裝 npm 套件
  
  ```
  $  npm install
  ```
  4. 安裝 nodemon 套件
  ```
  $  npm install -g nodemon
  ```
  5. 啟動伺服器，執行 app.js 檔案
  ```
  $  nodemon app.js
  ```
  
  6. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結
  ```
  Express is listening on localhost:3000
  ```
  7. 現在，你可開啟任一瀏覽器瀏覽器輸入 (http://localhost:3000) 即可進入網站體驗
  ```
  http://localhost:3000
  ```
  
## 功能描述 (features)：
  1. 依餐廳名稱搜尋喜愛的餐廳
  2. 點擊餐廳卡片顯示詳細的餐廳訊息
  3. 可以新增一家餐廳
  4. 可以修改一家餐廳的資訊
  5. 可以刪除一家餐廳
