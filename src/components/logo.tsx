
const Logo = () => {
  return (
    <div className="flex items-center gap-2 font-bold text-lg text-riesgo-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-riesgo-400">
        <path d="M10.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
        <path d="M2 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
        <path d="M14 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"></path>
        <path d="M2 6h12"></path>
        <path d="M14 8v6.5"></path>
        <path d="M10.5 14v-1"></path>
        <path d="M2 14v-1"></path>
      </svg>
      <span>RiesgoAlertas Broker</span>
    </div>
  );
};

export default Logo;
