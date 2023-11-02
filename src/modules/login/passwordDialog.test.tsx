import { render, screen, fireEvent, act } from '@testing-library/react';
import PasswordDialog from './passwordDialog';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { welcome_headline } from '../app_configuration/app_texts';


const mockUserAccountsList =
    [{ "id": "1", "idToken": "generateIdToken()", "userName": "1cb0c78fef6239036aca221239188f4d", "password": "bc15f308b068911ccc0ac032af7ef9d4", "description": "Willkommen zur Lernplattform", "licenseDuration": "2025-07-15" }, { "id": "2", "idToken": "generateIdToken()", "userName": "f8bf38d5e62d8d22eb344668d430f717", "password": "904723dd47b617271e22572458e3eb01", "description": "Mock Account. Dies ist nur bis zu dem 15.07.2023 noch möglich.", "licenseDuration": "2023-07-15" }, { "id": "3", "idToken": "generateIdToken()", "userName": "4660e986d04a68b5de17fd26b48f54e0", "password": "54043e75620557ad78c5894b8fc78096", "description": "Dies ist ein Mock Account.", "licenseDuration": "2024-01-01" }];

describe('Password Dialog Tests', () => {

    test('renders without crashing', () => {
        render(
            <Router>
                <PasswordDialog onPasswordEntered={() => { }} userAccountsList={mockUserAccountsList} />
            </Router>
        );
    });

    test('renders with config texts', () => {
        render(
            <Router>
                <PasswordDialog onPasswordEntered={() => { }} userAccountsList={mockUserAccountsList} />
            </Router>
        );
        expect(screen.getByText(welcome_headline)).toBeInTheDocument();
    });

    test('handles login with correct credentials', async () => {
        const onPasswordEntered = jest.fn();

        render(
            <Router>
                <PasswordDialog onPasswordEntered={onPasswordEntered} userAccountsList={mockUserAccountsList} />
            </Router>
        );

        await userEvent.type(screen.getByTestId('username-input'), 'MockAccount_Name_Valid');
        await userEvent.type(screen.getByTestId('password-input'), 'MockAccount_Passwort_Valid');

        fireEvent.click(screen.getByTestId('login-button'));
        expect(onPasswordEntered).toHaveBeenCalled();
    });

    test('handles login with correct credentials but expired license', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(
            <Router>
                <PasswordDialog onPasswordEntered={jest.fn()} userAccountsList={mockUserAccountsList} />
            </Router>
        );

        await userEvent.type(screen.getByTestId('username-input'), 'MockAccount_Name_Abgelaufen');
        await userEvent.type(screen.getByTestId('password-input'), 'MockAccount_Passwort_Abgelaufen');

        fireEvent.click(screen.getByTestId('login-button'));

        expect(alertSpy).toHaveBeenCalledWith('Ihre Lizenz ist bereits abgelaufen!');
        alertSpy.mockRestore();
    });

    test('handles login with wrong credentials', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(
            <Router>
                <PasswordDialog onPasswordEntered={jest.fn()} userAccountsList={mockUserAccountsList} />
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
                <PasswordDialog onPasswordEntered={jest.fn()} userAccountsList={mockUserAccountsList} />
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
                <PasswordDialog onPasswordEntered={onPasswordEntered} userAccountsList={mockUserAccountsList} />
            </Router>
        );

        fireEvent.click(screen.getByTestId('login-button-no-account'));
        expect(onPasswordEntered).toHaveBeenCalled();
    });
});
