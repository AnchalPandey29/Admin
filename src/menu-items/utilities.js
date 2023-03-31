// assets
import {
    IdcardOutlined,
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    ReadOutlined,
    LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
    IdcardOutlined,
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    ReadOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Blog',
            type: 'item',
            url: '/blog',
            icon: icons.AntDesignOutlined
        },
        {
            id: 'util-color',
            title: 'Campaigns',
            type: 'item',
            url: '/campaign',
            icon: icons.IdcardOutlined

        },
        {
            id: 'util-shadow',
            title: 'News',
            type: 'item',
            url: '/news',
            icon: icons.ReadOutlined
        },
        {
            id: 'ant-icons',
            title: 'Ant Icons',
            type: 'item',
            url: '/icons/ant',
            icon: icons.AntDesignOutlined,
            breadcrumbs: false
        }
    ]
};

export default utilities;
