import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// import SearchInput from '../SearchInput';

export default function MyNavbar(props) {
  const history = useHistory();
  const logMeOut = (e) => {
    e.preventDefault();
    history.push('/');
    firebase.auth().signOut();
  };
  const { user } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return user && (
    <div>
      <Navbar color='dark' dark expand='md' className='justify-content-between'>
        <Link className="navbar-brand" to='/'>React Pinterest</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <Link className="nav-link" to='/boards'>Boards</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to='/pins'>
                Pins
              </Link>
            </NavItem>
          </Nav>
          {/* <SearchInput {...props} /> */}
          {
            user
            && <>
              <UncontrolledDropdown>
              <DropdownToggle nav caret>
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
                {user?.displayName}
                </DropdownItem>
                <DropdownItem>
                  <div
                    className='nav-link logout-btn'
                    onClick={(e) => logMeOut(e)}
                  >
                    Logout
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </>
          }
        </Collapse>
      </Navbar>
    </div>
  );
}
