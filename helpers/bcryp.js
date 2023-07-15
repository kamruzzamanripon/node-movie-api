import bcrypt from 'bcryptjs';

export const hashMaker = (str)=> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}

export const matchData = (str, hash)=> {
    return bcrypt.compareSync(str, hash);
}