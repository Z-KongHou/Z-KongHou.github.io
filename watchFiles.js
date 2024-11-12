const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// 文件夹A和文件夹B的路径
const folderA = './notebooks';
const folderB = './content/docs/Learn_Python';

if (!fs.existsSync(folderB)) {
  fs.mkdirSync(folderB);
}

// 监控文件夹
const watcher = chokidar.watch(folderA, { ignored: /^\./, persistent: true });

// 用于记录文件处理状态
let pendingTasks = 0;

watcher.on('add', (filePath) => {
  if (filePath.endsWith('.ipynb')) {
    pendingTasks++;  // 增加待处理任务的数量

    const mdFilePath = path.join(folderB, path.basename(filePath, '.ipynb') + '.md');
    const command = `C:\\Users\\KongHou\\miniconda3\\envs\\jupyter\\Scripts\\jupyter nbconvert --to markdown ${filePath} --output-dir ${folderB} --execute --allow-errors`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行转换命令时出错: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`转换错误: ${stderr}`);
      }
      console.log(`文件 ${filePath} 成功转换为 ${mdFilePath}`);

      pendingTasks--;  // 完成一个任务后减少任务数量

      // 如果所有任务都已处理完成，则关闭 watcher 并退出进程
      if (pendingTasks === 0) {
        console.log('所有文件处理完成，关闭文件监控并退出进程...');
        watcher.close();  // 关闭文件监控
        process.exit();  // 退出进程
      }
    });
  }
}).on('error', (error) => {
  console.error(`监控发生错误: ${error}`);
});

// 监听完成后，等待任务完成
watcher.on('ready', () => {
  console.log('文件夹监控已就绪，等待文件处理...');
});