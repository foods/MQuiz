import { useNavigate } from 'react-router-dom';
import useAuthentication from '../../core/authentication/useAuthentication';
import { useCreateGameMutation } from '../api/authenticationApi';

const Welcome = () => {
    const [createGame, result] = useCreateGameMutation();
    const navigate = useNavigate();

    const { login } = useAuthentication();

    const createClick = async () => {
        const r = await createGame().unwrap();
        login(r);
        navigate('/gamemaster');
    };

    return (
        <div>
            <p>Hej</p>
            <p onClick={createClick}>Skapa spel</p>
        </div>
    );
};

export default Welcome;
