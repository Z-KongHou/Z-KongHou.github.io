const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// 文件夹A和文件夹B的路径
const folderA = path.join(__dirname, 'notebooks');
const folderB = path.join(__dirname, 'content', 'docs','learn_python');


if (!fs.existsSync(folderB)) {
  fs.mkdirSync(folderB);
}

// 监控文件夹
chokidar.watch(folderA, { ignored: /^\./, persistent: true })
  .on('add', (filePath) => {
    // 判断是否为.ipynb文件
    if (filePath.endsWith('.ipynb')) {
      // 生成对应的.md文件路径（这里只使用文件名，不包含完整路径）
      const mdFileName = path.basename(filePath, '.ipynb') + '.md';
      
      // 转换命令（不指定 --output-dir 的同时传入目标文件夹）
      const command = `C:\\Users\\KongHou\\miniconda3\\envs\\jupyter\\Scripts\\jupyter nbconvert --to markdown ${filePath} --output-dir ${folderB} --execute --allow-errors`;

      // 执行转换命令
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`执行转换命令时出错: ${error}`);
          return;
        }
        if (stderr) {
          console.error(`转换错误: ${stderr}`);
        }
        if (stdout) {
          console.log(`转换输出: ${stdout}`);
        }
        console.log(`文件 ${filePath} 成功转换为 ${path.join(folderB, mdFileName)}`);
      });
      
    }
  })
  .on('error', (error) => console.error(`监控发生错误: ${error}`));
