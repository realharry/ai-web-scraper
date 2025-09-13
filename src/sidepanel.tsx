import { createRoot } from 'react-dom/client';
import SidePanelApp from './components/SidePanelApp';
import './styles/sidepanel.css';

const container = document.getElementById('sidepanel-root');
if (container) {
  const root = createRoot(container);
  root.render(<SidePanelApp />);
}