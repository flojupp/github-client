export interface GithubRepository {
    id: number;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    descriptionHTML?: string;
    shortDescriptionHTML?: string;
    homepageUrl?: string;
    owner?: any;
    forkCount?: number;
    isArchived?: boolean;
    isFork?: boolean;
    isLocked?: boolean;
    isMirror?: boolean;
    isTemplate?: boolean;
    isDisabled?: boolean;
}