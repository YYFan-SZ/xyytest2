// 重新创建app/page.tsx作为应用入口

import RootPage from '../page';

export default function AppEntryPoint() {
  // 导入根目录的page.tsx组件
  return <RootPage />;
}