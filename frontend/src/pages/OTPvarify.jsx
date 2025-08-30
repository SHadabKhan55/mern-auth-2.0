import React from 'react'

const OTPvarify = () => {
    return (
        <div>
            <form>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required />
                </div>

                <div>
                    <label>OTP:</label>
                    <input type="text" name="otp" required />
                </div>

                <button type="submit">Verify OTP</button>
            </form>

        </div>
    )
}

export default OTPvarify