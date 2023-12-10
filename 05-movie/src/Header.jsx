import Logo from "./Logo";

export default function Header({ children }) {
  return (
    <header className='nav'>
      <Logo />
      {children}
    </header>
  );
}
