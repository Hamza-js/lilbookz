export const routes = {
  students: {
    current: '/students/current',
    email: '/students/email',
    text: '/students/text',
    cancelled: '/students/cancelled',
    waitingList: '/students/waitingList',
  },
  admin: {
    classes: '/admin/classes',
    teachers: '/admin/teachers',
    shows: '/admin/shows',
    customers: '/admin/customers',
  },
  accounts: {
    invoicing: '/accounts/invoicing',
  },
  documents: {
    General:
      'https://www.dropbox.com/scl/fo/tyj91nxs67w6o43rjv8pb/h?rlkey=w9350q0d10877wh6d8fasft6u&st=vz37dwae&dl=0',
    Ballet:
      'https://www.dropbox.com/scl/fo/684vvhcgo6vol52mln9tc/AKsoyUYlO7Wtm1i1k8aDP6k?rlkey=epaguvqiyowb916zj1ipluuxk&st=a1v55j3t&dl=0',
    'Music & MOVE IT!':
      'https://www.dropbox.com/scl/fo/595bjppdk9dggb6sp6bwe/AMQzD8dxpiFMjE7ZKgB1os8?rlkey=wrlj0efdm4gtyq49vk9rf1euo&st=wgumcbux&dl=0',
    'Street/Hip Hop':
      'https://www.dropbox.com/scl/fo/8plfx5wjhjfgjce1s9v1m/h?rlkey=o4up7ui4yzu8b76xgsqrs78j8&st=6vp60te8&dl=0',
    Tap: 'https://www.dropbox.com/scl/fo/zvof3wlwx1ju8z5rdhdwh/AFZX8KmoYygZsU-14ShyyqI?rlkey=4gw9nnmc229sg4qyqul73pj61&st=c0hnleji&dl=0',
  },
  socials: {
    General: 'https://lilbeatz.com/lil-beatz-creative',
    'Ballet & Tap': 'https://lilbeatz.com/lil-beatz-creative#ballettap',
    'Music & MOVE IT!': 'https://lilbeatz.com/lil-beatz-creative#moveit',
    'Street/Hip Hop': 'https://lilbeatz.com/lil-beatz-creative#street',
  },
  supportt: '/supportt',

  eCommerce: {
    dashboard: '/ecommerce',
    products: '/ecommerce/products',
    createProduct: '/ecommerce/products/create',
    productDetails: (slug: string) => `/ecommerce/products/${slug}`,
    ediProduct: (slug: string) => `/ecommerce/products/${slug}/edit`,
    categories: '/ecommerce/categories',
    createCategory: '/ecommerce/categories/create',
    editCategory: (id: string) => `/ecommerce/categories/${id}/edit`,
    orders: '/ecommerce/orders',
    createOrder: '/ecommerce/orders/create',
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    reviews: '/ecommerce/reviews',
    shop: '/ecommerce/shop',
    cart: '/ecommerce/cart',
    checkout: '/ecommerce/checkout',
    trackingId: (id: string) => `/ecommerce/tracking/${id}`,
  },
  searchAndFilter: {
    realEstate: '/search/real-estate',
    nft: '/search/nft',
    flight: '/search/flight',
  },
  support: {
    dashboard: '/support',
    inbox: '/support/inbox',
    supportCategory: (category: string) => `/support/inbox/${category}`,
    messageDetails: (id: string) => `/support/inbox/${id}`,
    snippets: '/support/snippets',
    createSnippet: '/support/snippets/create',
    viewSnippet: (id: string) => `/support/snippets/${id}`,
    editSnippet: (id: string) => `/support/snippets/${id}/edit`,
    templates: '/support/templates',
    createTemplate: '/support/templates/create',
    viewTemplate: (id: string) => `/support/templates/${id}`,
    editTemplate: (id: string) => `/support/templates/${id}/edit`,
  },
  logistics: {
    dashboard: '/logistics',
    shipmentList: '/logistics/shipments',
    customerProfile: '/logistics/customer-profile',
    createShipment: '/logistics/shipments/create',
    editShipment: (id: string) => `/logistics/shipments/${id}/edit`,
    shipmentDetails: (id: string) => `/logistics/shipments/${id}`,
    tracking: (id: string) => `/logistics/tracking/${id}`,
  },
  executive: {
    dashboard: '/executive',
  },
  analytics: '/analytics',
  financial: {
    dashboard: '/financial',
  },
  file: {
    dashboard: '/file',
    manager: '/file-manager',
    upload: '/file-manager/upload',
    create: '/file-manager/create',
  },
  pos: {
    index: '/point-of-sale',
  },
  eventCalendar: '/event-calendar',
  rolesPermissions: '/roles-permissions',
  invoice: {
    home: '/invoice',
    create: '/invoice/create',
    details: (id: string) => `/invoice/${id}`,
    edit: (id: string) => `/invoice/${id}/edit`,
  },
  widgets: {
    cards: '/widgets/cards',
    icons: '/widgets/icons',
    charts: '/widgets/charts',
    maps: '/widgets/maps',
    banners: '/widgets/banners',
  },
  tables: {
    basic: '/tables/basic',
    collapsible: '/tables/collapsible',
    enhanced: '/tables/enhanced',
    pagination: '/tables/pagination',
    search: '/tables/search',
    stickyHeader: '/tables/sticky-header',
  },
  multiStep: '/multi-step',
  forms: {
    profileSettings: '/forms/profile-settings',
    notificationPreference: '/forms/profile-settings/notification',
    personalInformation: '/forms/profile-settings/profile',
    newsletter: '/forms/newsletter',
  },
  emailTemplates: '/email-templates',
  profile: '/profile',
  welcome: '/welcome',
  comingSoon: '/coming-soon',
  accessDenied: '/access-denied',
  notFound: '/not-found',
  maintenance: '/maintenance',
  blank: '/blank',
  auth: {
    signUp1: '/auth/sign-up-1',
    signUp2: '/auth/sign-up-2',
    signUp3: '/auth/sign-up-3',
    signUp: '/auth/sign-up',
    signUp5: '/auth/sign-up-5',
    // sign in
    signIn1: '/auth/sign-in-1',
    signIn2: '/auth/sign-in-2',
    signIn3: '/auth/sign-in-3',
    signIn: '/auth/sign-in',
    signIn5: '/auth/sign-in-5',
    // forgot password
    forgotPassword1: '/auth/forgot-password-1',
    forgotPassword2: '/auth/forgot-password-2',
    forgotPassword3: '/auth/forgot-password-3',
    forgotPassword: '/auth/forgot-password',
    forgotPassword5: '/auth/forgot-password-5',
    // OTP
    otp1: '/auth/otp-1',
    otp2: '/auth/otp-2',
    otp3: '/auth/otp-3',
    otp: '/auth/otp',
    otp5: '/auth/otp-5',
  },
  signIn: '/signin',
};
