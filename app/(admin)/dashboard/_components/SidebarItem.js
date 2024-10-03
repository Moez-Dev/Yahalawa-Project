import home from '@/public/dashboard/home.svg'
import flag from '@/public/dashboard/flag.svg'
import recipes from '@/public/dashboard/knife-fork.svg'
import user from '@/public/dashboard/user.svg'
import premium from '@/public/dashboard/premium.svg'
import menu from '@/public/dashboard/menu.svg'
import webite from '@/public/dashboard/website.svg'
import parametres from '@/public/dashboard/parametres.svg'
import pages from '@/public/dashboard/pages.svg'
import footer from '@/public/dashboard/footer.svg'


    const SidebarItem = [
        {
            title: 'Home',
            icon: home,
            href: '/dashboard/home',
        },
        {
            title: 'Recettes',
            icon: recipes,
            subtitle: [
                {
                    title: 'Recettes',
                    href: '/dashboard/recettes'
                },
                {
                    title: 'Nouvelle recette',
                    href: '/dashboard/nouvelle_recette'
                },
                {
                    title: 'Catégories',
                    href: '/dashboard/categories'
                },
                {
                    title: 'Ingrédients',
                    href: '/dashboard/ingredients'
                },
                {
                    title: 'Unités',
                    href: '/dashboard/unites'
                },
                {
                    title: 'Ustensiles',
                    href: '/dashboard/ustensiles'
                },
                {
                    title: 'Origine',
                    href: '/dashboard/origine'
                },
                {
                    title: 'Tags',
                    href: '/dashboard/tag'
                },
            ],
        },
        {
            title: 'Tips',
            icon: flag,
            subtitle: [
                {
                    title: 'Gestion',
                    href: '/dashboard/gestion_tips'
                },
                {
                    title: 'Catégories',
                    href: '/dashboard/categories_tips'
                },
                {
                    title: 'Nouvelle astuce',
                    href: '/dashboard/nouvelle_astuce'
                },
            ],
        },
        {
            title: 'Rubriques',
            icon: pages,
            subtitle: [
                {
                    title: 'Recettes',
                    href: '/dashboard/rubriques_recettes'
                },
                {
                    title: 'Tips ',
                    href: '/dashboard/rubriques_tips'
                },
            ],
        },
        {
            title: 'Website',
            icon: webite,
            href: '/',
        },
        {
            title: 'Utilisateurs',
            icon: user,
            href: '/dashboard/yahalawa_users',
        },
    {
        title: 'Yahalawa by TT',
        icon: premium,
        subtitle: [
            {
                title: 'TT recettes',
                href: '/dashboard/tt_recettes'
            },
            {
                title: 'TT users',
                href: '/dashboard/tt_users'
            },
            {
                title: 'Recette rubrique',
                href: '/dashboard/rubrique_T_recette'
            },
            {
                title: 'Tip rubrique',
                href: '/dashboard/rubrique_T_tip'
            },
            {
                title: 'Website',
                href: '/premium/home'
            },
        ],
    },
    {
        title: 'Menu',
        icon: menu,
        href: '/dashboard/gestion_menu'
    },
    {
        title: 'Footer',
        icon: footer,
        subtitle: [
            {
                title: 'Yahlawa termes',
                href: '/dashboard/yahalawa_terms'
            },
            {
                title: 'TT termes',
                href: '/dashboard/tt_terms'
            },
            {
                title: 'about us',
                href: '/dashboard/about_us'
            },
        ],
    },
    {
        title: 'Settings',
        icon: parametres,
        href: '/dashboard/settings',
    },
]

export default SidebarItem