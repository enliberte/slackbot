export interface ISlashCommand {
    name: string;
    description: string;
    hint: string;
}

const slashCommands: ISlashCommand[] = [
    {
        name: '*/subscribe*',
        description: '*Subcribe* to PR',
        hint: 'Use "/subscribe" to *select developers and repositories from your favorites* or "/subscribe RepositoryURL DeveloperDisplayName" (for instance "/subscribe https://stash.firmglobal.com/users/alexeysu/repos/slackbot Alexey Sumatokhin.EXT") to *subscribe with CLI*'
    },
    {
        name: '*/add_user*',
        description: '*Add user* into your favorites',
        hint: 'Use "/add_user DeveloperDisplayName" (for instance "/add_user Alexey Sumatokhin.EXT") to *add user* into your favorites'
    },
    {
        name: '*/add_repo*',
        description: '*Add repository* into your favorites',
        hint: 'Use "/add_repo RepositoryURL" (for instance "/add_repo https://stash.firmglobal.com/users/alexeysu/repos/slackbot") to *add repository* into your favorites'
    },
    {
        name: '*/repos*',
        description: '*Show repositories* added into favorites',
        hint: 'Use "/repos" to *get repositories* added into your favorites'
    },
    {
        name: '*/users*',
        description: '*Show developers* added into favorites',
        hint: 'Use "/users" to *get developers* added into your favorites'
    },
    {
        name: '*/signup*',
        description: '*Sign up* for admin website',
        hint: 'Use "/signup" to get onetime link to *sign in admin website*'
    }
];

export default slashCommands;