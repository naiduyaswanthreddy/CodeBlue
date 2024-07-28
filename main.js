document.getElementById('signup-button').addEventListener('click', function(event) {
    event.preventDefault();
    loadSignupForm();
});

function loadSignupForm() {
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = `
        <div class="form">
            <form action="/signup" method="POST">
                <h2>Signup Here</h2>
                <input type="text" name="name" id="name" placeholder="Enter name" required>
                <input type="email" name="email" id="email" placeholder="Enter email" required>
                <input type="password" name="password" id="password" placeholder="Enter password" required>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" required>
                <input type="tel" name="phone" placeholder="Phone Number" required><br>
                <select name="gender" id="gender">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <button class="animated-button" type="submit">
                    <span>Signup</span>
                    <span></span>
                </button>
                <p class="link">Already have an account?</p>
                <p class="liw"><a href="login.html" class="login-link">Login here</a></p>
            </form>
        </div>
    `;
}
