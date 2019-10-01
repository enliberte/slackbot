export interface ISlashCommand {
    name: string;
    description: string;
    hint: string;
}

const slashCommands: ISlashCommand[] = [
    {
        name: '/subscribe',
        description: '*Subcribe* to PR',
        hint: 'Use "/subscribe" to *select developers and repositories from your favorites* or "/subscribe RepositoryURL DeveloperDisplayName" (for instance "/subscribe https://stash.firmglobal.com/developers/alexeysu/repos/slackbot Alexey Sumatokhin.EXT") to *subscribe with CLI*'
    },
    {
        name: '/add_developer',
        description: '*Add developer* into your favorites',
        hint: 'Use "/add_developer DeveloperDisplayName" (for instance "/add_developer Alexey Sumatokhin.EXT") to *add developer* into your favorites'
    },
    {
        name: '/add_repository',
        description: '*Add repository* into your favorites',
        hint: 'Use "/add_repository RepositoryURL" (for instance "/add_repository https://stash.firmglobal.com/users/alexeysu/repos/slackbot") to *add repository* into your favorites'
    },
    {
        name: '/repositories',
        description: '*Show repositories* added into favorites',
        hint: 'Use "/repositories" to *get repositories* added into your favorites'
    },
    {
        name: '/developers',
        description: '*Show developers* added into favorites',
        hint: 'Use "/developers" to *get developers* added into your favorites'
    },
    {
        name: '/signup',
        description: '*Sign up* for admin website',
        hint: 'Use "/signup" to get onetime link to *sign in admin website*'
    }
];

export default slashCommands;