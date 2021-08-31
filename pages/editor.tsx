import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import cn from "classnames";
import { MdAdd, MdClose } from 'react-icons/md';
import { PageBuilder } from '../builder/PageBuilder';
import { DraggableChoiceList } from '../builder/DraggableChoiceList';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { initializeStore } from '../state/store';
import { useEditionState, useFillable } from '../state/selectors';
import { useDispatch } from 'react-redux';
import { appendPage, deleteField, setActiveField, setActivePage } from '../state/creator';
import { initialPage, Page } from '../engine/page';
import { useCallback } from 'react';
import names from "../engine/field_names.json";
import { fieldCode } from '../engine/creators';
import TopAppBar from '../ui/TopAppBar';
import { useState } from 'react';
import { Initializer } from '../ui/Initializer';

export default function EditorScreen() {
  const [activeTab, setActiveTab] = useState("fields");
  const fillable = useFillable();
  const edition = useEditionState();
  const dispatch = useDispatch();

  const setHighlightedField = useCallback((id: string) => {
    dispatch(setActiveField(id));
  }, [dispatch]);

  const moveToPage = useCallback((id: string) => {
    dispatch(setActivePage(id));
  }, [dispatch]);

  const addPage = useCallback(() => {
    dispatch(appendPage(initialPage()))
  }, [dispatch])

  const updateActivePage = useCallback((next: Page) => {
    dispatch(appendPage(next));
  }, [dispatch])

  const activePage = useMemo(() => {
    return fillable.pages.find((p) => p.key === edition.activePage)
  }, [edition.activePage, fillable]);

  const removeField = useCallback((pageId: string, fieldId: string) => {
    return dispatch(deleteField(pageId, fieldId));
  }, [dispatch]);

  useEffect(() => {
    moveToPage(fillable.pages[0].key);
  }, [])

  return (
    <Initializer redirectToSignin>
      <div className={styles.container}>
        <Head>
          <title>Polyfill.me</title>
          <meta name="description" content="Create forms" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <header className={styles.header}>
            <TopAppBar />
          </header>
          <section className={styles.structure_wrapper}>
            <div className={cn(styles.structure, styles.structure_pages)}>
              <header>
                <h4>Pages</h4>
                <div className={styles.actions}>
                  <button onClick={addPage}>
                    <MdAdd size={18} />
                  </button>
                </div>
              </header>
              <div className={styles.content_wrapper}>
                <ul className={"item_list " + styles.content}>
                  {
                    fillable.pages.map((p) => {
                      return <li key={p.key} className={styles.page_item} onClick={() => moveToPage(p.key)} data-active={activePage && activePage.key === p.key}>
                        {p.title}
                      </li>
                    })
                  }
                </ul>
              </div>
            </div>
            <div className={cn(styles.structure, styles.structure_composition)}>
              <header>
                <h4>Composition</h4>
                <div className={styles.actions}>
                  <button>
                    <MdAdd size={18} />
                  </button>
                </div>
              </header>
              <div className={styles.content_wrapper}>
                {activePage && <ul className={"item_list " + styles.content}>
                  {
                    activePage.fields.map((f) => {
                      return <li key={f.key} className={styles.field_item} onClick={() => setHighlightedField(f.key)} data-active={f.key === edition.activeField}>
                        <div className={styles.content}>
                          <span className={styles.title}>{f.title || "Sans titre"}</span>
                          <span className={styles.type}>{names[fieldCode(f)]}</span>
                        </div>
                        <div className={styles.actions}>
                          <button onClick={() => removeField(activePage.key, f.key)}>
                            <MdClose size={18} />
                          </button>
                        </div>
                      </li>
                    })
                  }
                </ul>}
              </div>
            </div>
          </section>
          <section className={styles.base_wrapper}>
            <div className={styles.base_content}>
              <div className={styles.builder_wrapper}>
                {
                  activePage && <PageBuilder page={activePage} />
                }
              </div>
            </div>
          </section>
          <section className={styles.details_wrapper}>
            <div className={styles.tabs_details}>
              <div className={styles.tab} data-active={activeTab === "fields"} onClick={() => setActiveTab("fields")}>
                <h5>Champs</h5>
              </div>
              <div className={styles.tab} data-active={activeTab === "edition"} onClick={() => setActiveTab("edition")}>
                <h5>Edition</h5>
              </div>
              <div className={styles.tab} data-active={activeTab === "style"} onClick={() => setActiveTab("style")}>
                <h5>Style</h5>
              </div>
            </div>
            <div className={styles.tab_content}>
              {
                activeTab === "edition" &&
                <DraggableChoiceList />
              }
              {
                activeTab === "fields" &&
                <DraggableChoiceList />
              }
              {
                activeTab === "style" &&
                <DraggableChoiceList />
              }
            </div>
          </section>
        </main>
      </div>
    </Initializer>
  )
}



export function getServerSideProps() {
  let initial = initializeStore(undefined);
  return { props: { initialReduxState: initial.getState() } };
}