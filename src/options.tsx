import { createRoot } from 'react-dom/client';
import OptionsApp from './components/OptionsApp';
import './styles/options.css';

const container = document.getElementById('options-root');
if (container) {
  const root = createRoot(container);
  root.render(<OptionsApp />);
}