import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useInstanceStore } from '../stores/instance.store';
import { useCondominiumStore } from '../stores/condominium.store';

export const InstanceGuard = () => {
    const { condominiumId } = useParams();
    const id = Number(condominiumId);
    const { userCondominiumRelations } = useCondominiumStore();
    const { syncFromParam } = useInstanceStore();

    useEffect(() => {
        if (!isNaN(id)) {
            syncFromParam(id);
        }
    }, [id, syncFromParam]);

    const hasAccess = userCondominiumRelations.some(r => r.condominioId === id);
    if (!hasAccess) {
        return <Navigate to="/condominios" replace />;
    }

    return <Outlet />;
};
