import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Panel lateral',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Productos',
          route: '/layout/dashboard/',
          children: [
            { label: 'Certificación productos', route: '/layout/dashboard/producto-certificado' },
            // { label: 'Podcast', route: '/dashboard/podcast' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Login',
          route: '/auth',
          children: [
            { label: 'Solicitud registro', route: '/auth/sign-up' },
            { label: 'Solicitud login', route: '/auth/sign-in' },
            { label: 'Contraseña olvidada', route: '/auth/forgot-password' },
            { label: 'Nueva contraseña', route: '/auth/new-password' },
            { label: 'Doble factor', route: '/auth/two-steps' },
          ],
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/shield-exclamation.svg',
        //   label: 'Erros',
        //   route: '/errors',
        //   // children: [
        //   //   { label: '404', route: '/errors/404' },
        //   //   { label: '500', route: '/errors/500' },
        //   // ],
        // },
      ],
    },
    {
      group: 'Administración',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Nube',
          route: '/download',
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/gift.svg',
        //   label: 'Gift Card',
        //   route: '/gift',
        // },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Usuarios',
          route: '/layout/dashboard/',
          children: [
            { label: 'Roles/Permisos', route: '/layout/dashboard/roles-permisos' },
            // { label: 'Podcast', route: '/dashboard/podcast' },
          ],
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Configuración',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notificaciones',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Encarpetado',
          route: '/folders',
          children: [
            { label: 'Directorio', route: '/folders/current-files' },
            { label: 'Descargas', route: '/folders/download' },
            { label: 'Papelera', route: '/folders/trash' },
          ],
        },
      ],
    },
  ];
}
