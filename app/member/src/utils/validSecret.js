module.exports = async (req) => {
    const secret = req.get('token');
    if ( secret == 'rahasia' ) {
        return true;
    }
    return false;
}