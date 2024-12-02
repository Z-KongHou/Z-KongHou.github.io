const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

// 文件夹路径
const folders = [
  { input: './notebooks/beginner/notebooks', output: './content/Beginner/Content' },
  { input: './notebooks/intermediate/notebooks', output: './content/Intermediate/Content' }
];

// 用于记录文件处理状态
let pendingTasks = 0;

// 通用的文件转换函数
function convertFile(filePath, outputFolder) {
  pendingTasks++;  // 增加待处理任务的数量
  console.log(`待处理任务数: ${pendingTasks}`);

  const mdFilePath = path.join(outputFolder, path.basename(filePath, '.ipynb') + '.md');
  const command = `C:\\Users\\KongHou\\miniconda3\\envs\\jupyter\\Scripts\\jupyter nbconvert --to markdown ${filePath} --output-dir ${outputFolder} --execute --allow-errors`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行转换命令时出错: ${error}`);
      return;
    }
    
    console.log(`文件 ${filePath} 成功转换为 ${mdFilePath}`);

    pendingTasks--;  // 完成一个任务后减少任务数量
    console.log(`待处理任务数: ${pendingTasks}`);

    // 如果所有任务都已处理完成，则关闭 watcher 并退出进程
    if (pendingTasks === 0) {
      console.log('所有文件处理完成，关闭文件监控并退出进程...');
      process.exit();  // 退出进程
    }
  });
}

// 设置监控
folders.forEach(({ input, output }) => {
  const watcher = chokidar.watch(input, { ignored: /^\./, persistent: true });

  watcher.on('add', (filePath) => {
    if (filePath.endsWith('.ipynb')) {
      convertFile(filePath, output);
    }
  }).on('error', (error) => {
    console.error(`监控发生错误: ${error}`);
  }).on('ready', () => {
    console.log(`文件夹 ${input} 监控已就绪，等待文件处理...`);
  });
});
