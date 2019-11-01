export interface ICommand {
    name: string;
    description: string;
    hint: string;
}

const commands = {
    ADD_DEVELOPER: 'add_developer',
    ADD_REPOSITORY: 'add_repository',
    DEVELOPERS: 'developers',
    REPOSITORIES: 'repositories',
    SIGNUP: 'signup',
    SUBSCRIBES: 'subscribes',
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe',
    HELP: 'help',
    HI: 'hi',
    IAM: "I'm"
};

const commandsDescription: ICommand[] = [
    {
        name: commands.SUBSCRIBES,
        description: '*Show subscribes*',
        hint: `Write me "${commands.SUBSCRIBES} to *get subscribes*`
    },
    {
        name: commands.SUBSCRIBE,
        description: '*Subcribe* to PR',
        hint: `Write me ${commands.SUBSCRIBE} "RepositoryName" "DeveloperDisplayName" (for instance ${commands.SUBSCRIBE} "Confirmit.AppStudio.Client" "Alexey Sumatokhin.EXT") to *subscribe*`
    },
    {
        name: commands.UNSUBSCRIBE,
        description: '*Unsubscribe* from PR',
        hint: `Write me ${commands.UNSUBSCRIBE} "RepositoryName" "DeveloperDisplayName" (for instance ${commands.UNSUBSCRIBE} "Confirmit.AppStudio.Client" "Alexey Sumatokhin.EXT") to *unsubscribe*`
    },
    {
        name: commands.ADD_DEVELOPER,
        description: '*Add developer* into your favorites',
        hint: `Write me ${commands.ADD_DEVELOPER} "DeveloperDisplayName" (for instance ${commands.ADD_DEVELOPER} "Alexey Sumatokhin.EXT") to *add developer* into your favorites`
    },
    {
        name: commands.ADD_REPOSITORY,
        description: '*Add repository* into your favorites',
        hint: `Write me ${commands.ADD_REPOSITORY} "RepositoryName" (for instance ${commands.ADD_REPOSITORY} "Confirmit.AppStudio.Client") to *add repository* into your favorites`
    },
    {
        name: commands.REPOSITORIES,
        description: '*Show repositories* added into favorites',
        hint: `Write me "${commands.REPOSITORIES}" to *get repositories* added into your favorites`
    },
    {
        name: commands.DEVELOPERS,
        description: '*Show developers* added into favorites',
        hint: `Write me "${commands.DEVELOPERS}" to *get developers* added into your favorites`
    },
    {
        name: commands.SIGNUP,
        description: '*Sign up* for admin website',
        hint: `Write me ${commands.SIGNUP}" to get onetime link to *sign in admin website*`
    }
];

export {commands, commandsDescription};