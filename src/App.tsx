import './App.css';
import { AppProvider } from '@/providers/app.tsx';
import { AppRoutes } from '@/routes';
import NavBar from '@/components/NavBar/NavBar.tsx';

function App() {
    return (
        <AppProvider>
            <NavBar />
            <div className="grow p-8">
                <AppRoutes />
            </div>
        </AppProvider>
    );
}

export default App;
