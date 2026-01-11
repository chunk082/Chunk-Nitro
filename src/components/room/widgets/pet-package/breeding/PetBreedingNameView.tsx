import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AvatarInfoPet, LocalizeText } from '../../../../../api';
import { Flex, LayoutPetImageView, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../../common';

interface PetBreedingNameViewProps
{
    parentOne?: AvatarInfoPet;
    parentTwo?: AvatarInfoPet;
    onClose: () => void;
}

export const PetBreedingNameView: FC<PetBreedingNameViewProps> = ({
    parentOne,
    parentTwo,
    onClose
}) =>
{
    const [ petName, setPetName ] = useState('');

    const canConfirm = petName.length >= 3;

    const onConfirm = () =>
    {
        if(!canConfirm) return;

        console.log('BREED CONFIRMED:', petName);
        // 🚀 send composer later
    };

    return (
        <NitroCardView className="nitro-pet-breeding no-resize" theme="primary">
            <NitroCardHeaderView
                center
                headerText={ LocalizeText('breedpets.confirmation.widget.title') }
                onCloseClick={ onClose }
            />

            <NitroCardContentView>

                {/* DESCRIPTION */}
                <Text className="pet-breeding-desc">
                    { LocalizeText('breedpets.confirmation.widget.request') }
                </Text>

                {/* PARENTS */}
                <div className="pet-breeding-box mt-2">
                    <Flex justifyContent="between" alignItems="center">

                        {/* Parent One */}
                        <div className="pet-parent">
                            { parentOne &&
                                <>
                                    <Text bold center>{ parentOne.name }</Text>
                                    <LayoutPetImageView
                                        figure={ parentOne.petFigure }
                                        posture={ parentOne.posture }
                                        direction={ 4 }
                                    />
                                    <Text small center>
                                        { LocalizeText('pet.level', ['level'], [ parentOne.level.toString() ]) }
                                    </Text>
                                </>
                            }
                        </div>

                        {/* Parent Two */}
                        <div className="pet-parent">
                            { parentTwo &&
                                <>
                                    <Text bold center>{ parentTwo.name }</Text>
                                    <LayoutPetImageView
                                        figure={ parentTwo.petFigure }
                                        posture={ parentTwo.posture }
                                        direction={ 4 }
                                    />
                                    <Text small center>
                                        { LocalizeText('pet.level', ['level'], [ parentTwo.level.toString() ]) }
                                    </Text>
                                </>
                            }
                        </div>

                    </Flex>
                </div>

                {/* BABY NAME */}
                <div className="pet-breeding-section mt-3">
                    <Text className="pet-breeding-section-title">
                        { LocalizeText('breedpets.confirmation.widget.baby.name') }
                    </Text>

                    <input
                        type="text"
                        className="form-control input-pet-package"
                        value={ petName }
                        onChange={ e => setPetName(e.target.value) }
                    />
                </div>

                {/* BREEDING INFO */}
                <div className="pet-breeding-section mt-3">
                    <Text className="pet-breeding-section-title">
                        { LocalizeText('breedpets.confirmation.widget.breeding.info') }
                    </Text>
                </div>

                <div className="pet-breeding-box mt-2">
                    <p className="mb-2">
                        { LocalizeText('breedpets.confirmation.widget.text') }
                    </p>

                    <p className="mb-3">
                        { LocalizeText('breedpets.confirmation.widget.info') }
                    </p>

                    <div className="pet-breeding-odds">
                        <div className="odds-row">
                            { LocalizeText('breedpets.confirmation.widget.raritycategory.1') }
                        </div>
                        <div className="odds-row">
                            { LocalizeText('breedpets.confirmation.widget.raritycategory.2') }
                        </div>
                        <div className="odds-row">
                            { LocalizeText('breedpets.confirmation.widget.raritycategory.3') }
                        </div>
                        <div className="odds-row">
                            { LocalizeText('breedpets.confirmation.widget.raritycategory.4') }
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <Flex className="mt-3" gap={ 5 } justifyContent="center" alignItems="center">
                    <Text pointer onClick={ onClose }>
                        { LocalizeText('generic.cancel') }
                    </Text>

                    <Button
                        variant={ canConfirm ? 'success' : 'danger' }
                        disabled={ !canConfirm }
                        onClick={ onConfirm }>
                        { LocalizeText('generic.confirm') }
                    </Button>
                </Flex>

            </NitroCardContentView>
        </NitroCardView>
    );
};
