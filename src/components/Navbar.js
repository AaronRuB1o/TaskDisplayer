import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="navbar">
        <div className="mainTitle">Task Displayer</div>
      <ul className="links">
            <li><Link href="/main/main_display">Home</Link></li>
            <li><Link href="/main/tools/add">Add Task</Link></li>
      </ul>
      <ul></ul>
    </nav>
  );
}
