import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Main } from "./components/main/Main";
import { Admin } from "./components/admin/Admin";

import { useFetchData } from "./hooks/useFetchData";

function App() {
  const { fetchData, fetchCategories, fetchSettings } = useFetchData();

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchSettings();
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <div className='flex h-auto w-screen flex-col '>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
