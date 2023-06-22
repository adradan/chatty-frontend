import { DbContext, dbService } from '@/lib/db.ts';

type DBProviderTypes = {
    children: React.ReactNode;
};

export const DbProvider = (props: DBProviderTypes) => {
    const service = dbService;

    return (
        <DbContext.Provider value={service}>
            {props.children}
        </DbContext.Provider>
    );
};
