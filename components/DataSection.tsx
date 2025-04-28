import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { fetchTables } from '@/services/api';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Add the interface here, before the component function
interface DataItem {
    id: number | string;
    name: string;
    // other properties...
}

export function DataSection() {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchTables();
                setData(result);
            } catch (err) {
                setError('Failed to load data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <ThemedText>Loading...</ThemedText>;
    if (error) return <ThemedText>{error}</ThemedText>;
    if (data.length === 0) return <ThemedText>No data available</ThemedText>;

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id?.toString() || String(Math.random())}
                renderItem={({ item }) => (
                    <ThemedView style={styles.item}>
                        <ThemedText>{item.name}</ThemedText>
                    </ThemedView>
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    item: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
});