import { RoomObjectCategory } from '@nitrots/nitro-renderer';
import { useState } from 'react';
import { GetRoomEngine, GetRoomSession, RoomObjectItem } from '../../../api';
import { useUserAddedEvent, useUserRemovedEvent } from '../engine';
import { useRoom } from '../useRoom';

const useUserChooserWidgetState = () =>
{
    const [ items, setItems ] = useState<RoomObjectItem[]>(null);
    const { roomSession = null } = useRoom();

    const onClose = () => setItems(null);

    const selectItem = (item: RoomObjectItem) =>
        item && GetRoomEngine().selectRoomObject(GetRoomSession().roomId, item.id, item.category);

    const resolveType = (userType: number): string =>
    {
        switch(userType)
        {
            case 1: return 'Habbo'; // Normal user
            case 2: return 'Pet';
            case 4: return 'Bot';
            default: return '-';
        }
    }

    const populateChooser = () =>
    {
        const roomSession = GetRoomSession();
        const roomObjects = GetRoomEngine().getRoomObjects(roomSession.roomId, RoomObjectCategory.UNIT);

        setItems(roomObjects
            .map(roomObject =>
            {
                if(roomObject.id < 0) return null;

                const userData = roomSession.userDataManager.getUserDataByIndex(roomObject.id);
                if(!userData) return null;

                console.log(`[DEBUG] ${userData.name} -> type: ${userData.type}`);

                const type = resolveType(userData.type);
                return new RoomObjectItem(userData.roomIndex, RoomObjectCategory.UNIT, userData.name, 0, '-', type);
            })
            .filter(Boolean)
            .sort((a, b) => ((a.name < b.name) ? -1 : 1))
        );
    }

    useUserAddedEvent(!!items, event =>
    {
        if(event.id < 0) return;

        const userData = GetRoomSession().userDataManager.getUserDataByIndex(event.id);
        if(!userData) return;

        const type = resolveType(userData.type);

        setItems(prevValue =>
        {
            const newValue = [ ...prevValue ];
            newValue.push(new RoomObjectItem(userData.roomIndex, RoomObjectCategory.UNIT, userData.name, 0, '-', type));
            newValue.sort((a, b) => ((a.name < b.name) ? -1 : 1));
            return newValue;
        });
    });

    useUserRemovedEvent(!!items, event =>
    {
        if(event.id < 0) return;

        setItems(prevValue =>
        {
            const newValue = [ ...prevValue ];

            for(let i = 0; i < newValue.length; i++)
            {
                const existingValue = newValue[i];

                if((existingValue.id !== event.id) || (existingValue.category !== event.category)) continue;

                newValue.splice(i, 1);
                break;
            }

            return newValue;
        });
    });

    return { items, onClose, selectItem, populateChooser };
}

export const useUserChooserWidget = useUserChooserWidgetState;
