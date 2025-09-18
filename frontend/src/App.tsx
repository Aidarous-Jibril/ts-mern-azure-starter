import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store";
import { inc, dec } from "./redux/slices/counterReducer";

function App() {
  const { value } = useSelector((s: RootState) => s.counter);
  console.log("value", value)
  const dispatch = useDispatch<AppDispatch>();

  return (
   <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="p-6 bg-white rounded-xl shadow w-[360px] text-center space-y-4">
        <h1 className="text-2xl font-bold text-black">ts-mern-azure-starter</h1>
        <p className="text-gray-600">React + TS + Redux + Tailwind</p>
        <div className="text-3xl font-mono text-gray-800">{value}</div>
        <div className="space-x-2">
          <button className="px-3 py-1 rounded bg-black text-white" onClick={() => dispatch(inc())}>+</button>
          <button className="px-3 py-1 rounded bg-gray-200" onClick={() => dispatch(dec())}>-</button>
        </div>
      </div>
    </div>
  );
}
export default App;
