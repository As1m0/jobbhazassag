const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const submitBtn = document.getElementById('submitEmail');
const alertContainer = document.getElementById('alertContainer');
const nameInput = document.getElementById('name');

function showAlert(message, type = 'success') {
    alertContainer.innerHTML = `
                    <div class="alert alert-${type} alert-dismissible show" role="alert">
                        ${message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

submitBtn.addEventListener('click', async function () {
    const email = emailInput.value.trim();

    // Clear previous alerts
    alertContainer.innerHTML = '';

    // Validate email
    if (!email) {
        emailInput.classList.add('is-invalid');
        showAlert('Adj meg email címet.', 'danger');
        return;
    }

    const name = nameInput.value.trim();

    if (!validateEmail(email)) {
        emailInput.classList.add('is-invalid');
        showAlert('Hibás email formátum.', 'danger');
        return;
    }

    if (!name) {
        emailInput.classList.add('is-invalid');
        showAlert('Adj meg nevet.', 'danger');
        return;
    }

    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');

    // Disable submit button during processing
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Submitting...';

    try {
        // Send email to server
        const response = await fetch('collect-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: name,
                timestamp: new Date().toISOString()
            })
        });

        const result = await response.json();

        if (response.ok) {
            showAlert('Jelentkezés sikeresen rögzítve. Köszönjük!', 'success');
            emailInput.value = '';
            emailInput.classList.remove('is-valid');

            // Close modal after 2 seconds
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('emailModal'));
                modal.hide();
                //const hideElement = document.getElementsByClassName('modal-backdrop');
            }, 1500);
        } else {
            showAlert(result.error || 'Hiba az email cím elküldésénél.', 'danger');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Hálózati hiba. Ellenőrizd a kapcsolatot, majd próbálkozz újra', 'danger');
    }

    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Küldés';
});

// Clear validation on input
emailInput.addEventListener('input', function () {
    emailInput.classList.remove('is-invalid', 'is-valid');
});

// Submit on Enter key
emailInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        submitBtn.click();
    }
});

// Clear form when modal is closed
document.getElementById('emailModal').addEventListener('hidden.bs.modal', function () {
    emailInput.value = '';
    emailInput.classList.remove('is-invalid', 'is-valid');
    alertContainer.innerHTML = '';
});