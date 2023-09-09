import { hash } from 'spark-md5';

export const identicon = (value: string | any) => {
    const hashValue = hash(value);
    return 'https://www.gravatar.com/avatar/' + hashValue + '?d=identicon';
};
