import { render, screen, fireEvent, act } from '@testing-library/react';
import PasswordDialog from './passwordDialog';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { welcome_headline } from '../app_configuration/app_texts';


describe('Password Dialog Tests', () => {

    test('renders without crashing', () => {
        render(
            <Router>
                <PasswordDialog onPasswordEntered={() => { }} />
            </Router>
        );
    });

    test('renders with config texts', () => {
        render(
            <Router>
                <PasswordDialog onPasswordEntered={() => { }} />
            </Router>
        );
        expect(screen.getByText(welcome_headline)).toBeInTheDocument();
    });

    test('handles login with correct credentials', async () => {
        const onPasswordEntered = jest.fn();
        render(
            <Router>
                <PasswordDialog onPasswordEntered={onPasswordEntered} />
            </Router>
        );

        await userEvent.type(screen.getByTestId('username-input'), 'noUserAccount');
        await userEvent.type(screen.getByTestId('password-input'), 'noUserAccountPW');

        fireEvent.click(screen.getByTestId('login-button'));
        expect(onPasswordEntered).toHaveBeenCalled();
    });

    test('handles login with correct credentials but expired license', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(
            <Router>
                <PasswordDialog onPasswordEntered={jest.fn()} />
            </Router>
        );

        await userEvent.type(screen.getByTestId('username-input'), 'testAccount3');
        await userEvent.type(screen.getByTestId('password-input'), 'testAccount3_PW');

        fireEvent.click(screen.getByTestId('login-button'));

        expect(alertSpy).toHaveBeenCalledWith('Ihre Lizenz ist bereits abgelaufen!');
        alertSpy.mockRestore();
    });

    test('handles login with wrong credentials', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });


        render(
            <Router>
                <PasswordDialog onPasswordEntered={jest.fn()} />
            </Router>
        );

        await userEvent.type(screen.getByTestId('username-input'), 'MockAccount_Name_Falsch');
        await userEvent.type(screen.getByTestId('password-input'), 'MockAccount_Passwort_Falsch');

        fireEvent.click(screen.getByTestId('login-button'));

        expect(alertSpy).toHaveBeenCalledWith('Falscher Benutzername oder Passwort!');
        alertSpy.mockRestore();
    });

    test('handles 3 logins with wrong credentials', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
        
        render(
            <Router>
                <PasswordDialog onPasswordEntered={jest.fn()} />
            </Router>
        );

        for (let i = 0; i < 3; i++) {
            await userEvent.type(screen.getByTestId('username-input'), 'MockAccount_Name_Falsch');
            await userEvent.type(screen.getByTestId('password-input'), 'MockAccount_Passwort_Falsch');
            fireEvent.click(screen.getByTestId('login-button'));
            expect(alertSpy).toHaveBeenCalledWith('Falscher Benutzername oder Passwort!');
        }
        expect(screen.getByText('Zu viele falsche Versuche!')).toBeInTheDocument();
        expect(screen.getByText("Bitte warten Sie für 00:30 bevor Sie es erneut versuchen.")).toBeInTheDocument();
        alertSpy.mockRestore();
    });

    test('handle login without account', async () => {
        const onPasswordEntered = jest.fn();

        render(
            <Router>
                <PasswordDialog onPasswordEntered={onPasswordEntered} />
            </Router>
        );

        fireEvent.click(screen.getByTestId('login-button-no-account'));
        expect(onPasswordEntered).toHaveBeenCalled();
    });
});
