const PageHeader = (props) => (
    <div className='user-board-info d-flex flex-column align-items-center pt-3'>
      <img className="user-photo" src={props.user?.photoURL} alt={props.user?.displayName} />
      <h3>{props.user?.displayName}</h3>
      <h6>{props.user?.providerData[0].email}</h6>
    </div>
);

export default PageHeader;
