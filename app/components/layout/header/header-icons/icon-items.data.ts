import {INavItem} from "../header-navigation/navigation-items/nav-item.interface";
import {IconType} from "react-icons";
import {FaRegHeart, FaUserAlt} from "react-icons/fa";
import {BsBag, BsPerson} from "react-icons/bs";

export interface IIconItem extends Pick<INavItem, 'link'> {
    icon: IconType
}

const iconItemsData: IIconItem[] = [
    {
        icon: BsBag,
        link: '/cart'
    },
    {
        icon: BsPerson,
        link: '/profile'
    },
    {
        icon: FaRegHeart,
        link: '/favorites'
    },
]

export default iconItemsData