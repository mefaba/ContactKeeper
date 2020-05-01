import React, { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'

const AlertUnit = () => {
    const contextData = useContext(AlertContext)
    return (
        contextData.alerts.length > 0 && 
        contextData.alerts.map(alert=>{
            return (
                <div key={alert.id} className={`alert alert-${alert.type}`}>
                    <i className="fas fa-info-circle"></i> {alert.msg}
                </div>
            )
        })
    )
}

export default AlertUnit
