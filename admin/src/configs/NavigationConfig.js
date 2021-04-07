import { 
  DashboardOutlined, BookOutlined
} from '@ant-design/icons';

const dashBoardNavTree = [
  {
    key: 'home',
    path: '/app/home',
    title: 'Home',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'courses',
        path: '/app/courses',
        title: 'Courses',
        icon: BookOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'courses',
            path: '/app/courses',
            title: 'Courses',
            icon: BookOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
          key: 'add-course',
          path: '/app/courses/add-course',
          title: 'Add Course',
          icon: BookOutlined,
          breadcrumb: false,
          submenu: []
        }]
      },
      {
        key: 'orders',
        path: '/app/orders',
        title: 'Orders',
        icon: BookOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'queries',
        path: '/app/queries',
        title: 'Enquiries',
        icon: BookOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'course-queries',
            path: '/app/queries/courses',
            title: 'Courses',
            icon: BookOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
          key: 'general-queries',
          path: '/app/queries/general',
          title: 'General',
          icon: BookOutlined,
          breadcrumb: false,
          submenu: []
        }]
      },
    ]
  },
  {
    key: 'content',
    title: 'Content',
    icon: BookOutlined,
    breadcrumb: true,
    submenu: [{
      key: 'content',
      title: 'Basic',
      icon: BookOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'content',
          path: '/app/content/fundamentals',
          title: 'Fundamentals',
          icon: BookOutlined,
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'testimonials',
          path: '/app/content/testimonials',
          title: 'Testimonials',
          icon: BookOutlined,
          breadcrumb: false,
          submenu: []
        }
      ]
    }]
  },
  
  {
    key: 'blogs',
    path: '/app/blogs',
    title: 'Blogs',
    icon: BookOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'updates',
    path: '/app/updates',
    title: 'Updates',
    icon: BookOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'media',
    path: '/app/media',
    title: 'Media',
    icon: BookOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'gallery',
        path: '/app/gallery',
        title: 'Gallery',
        icon: BookOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'slider',
        path: '/app/slider',
        title: 'Slider',
        icon: BookOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'results',
        path: '/app/results',
        title: 'Result',
        icon: BookOutlined,
        breadcrumb: false,
        submenu: []
      },
    ]
  },
  
]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
