import React from 'react';
import { BsBook } from "react-icons/bs";
import { GiPapers } from "react-icons/gi";
import { ImStatsDots } from "react-icons/im";
import { Avatar, Nav, Navbar } from 'rsuite';

export interface MainHeaderProps
{
  active: string,
  onSelect?: (eventKey: any, event: React.SyntheticEvent) => void;
}

const MainHeader = ({ active, onSelect, ...props }:MainHeaderProps) => {
  return (
    <Navbar className={`!flex !justify-between`}>
      <Navbar.Brand href='/' className={``}>
        Langua
      </Navbar.Brand>
      <Nav {...props} activeKey={active} onSelect={onSelect} className='!justify-center w-full' appearance="subtle" justified>
        <Nav.Item key={'vocabulary'} icon={<BsBook/>} href='/vocabulary'>Vocabulary</Nav.Item>
        <Nav.Item key={'materials'} icon={<GiPapers/>} href='/materials'>Materials</Nav.Item>
        <Nav.Item key={'stats'} icon={<ImStatsDots/>} href='/stats'>Stats</Nav.Item>
      </Nav>
      <Nav >
        <Nav.Item href='/auth/signOut' className={`flex items-center gap-3`}>
          <Avatar circle/> SignOut
        </Nav.Item>
         
      </Nav>
    </Navbar>
  )
}

export default MainHeader