import './Topbar.css';

const Submenu = ({ name }) => {
    return (
        <div class = "sub_menu">
            <a href = "/" rel= "noreferrer">{name}</a>
        </div>
    )
}

const Topbar = () => {
    return (
        <div class = "topbar">
            <div class = "logo"></div>
            <div class = "blank"></div>
            <Submenu name = "Q&A"/>
            <Submenu name = "About Us"/>
        </div>
    );
}

export default Topbar;